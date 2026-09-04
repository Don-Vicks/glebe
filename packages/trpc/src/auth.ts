import { createHmac, timingSafeEqual } from "node:crypto";
import type { AuthedSession } from "./context";

// JWTs are built by hand (header.payload.signature) so we control the
// exact HMAC-SHA256 flow with zero runtime dependency on a JWT library.
const TOKEN_SEPARATOR = ".";

/** Encode to base64url (RFC 4648 §5) without padding. */
function base64UrlEncode(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

/** Decode a base64url string back to raw bytes. */
function base64UrlDecode(input: string) {
  return Buffer.from(input, "base64url");
}

function getSigningSecret() {
  const secret = process.env.ORGSITES_AUTH_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("ORGSITES_AUTH_SECRET must be configured in production.");
  }
  return secret ?? "dev-only-auth-secret-change-me";
}

export function signSessionToken(session: AuthedSession, expiresInSeconds: number) {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    sub: session.userId,
    orgId: session.organizationId,
    role: session.role,
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
    iat: Math.floor(Date.now() / 1000),
  };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}${TOKEN_SEPARATOR}${encodedPayload}`;
  const signature = createHmac("sha256", getSigningSecret()).update(unsignedToken).digest("base64url");
  return `${unsignedToken}${TOKEN_SEPARATOR}${signature}`;
}

export function verifySessionToken(token: string): AuthedSession | null {
  const [encodedHeader, encodedPayload, signature] = token.split(TOKEN_SEPARATOR);
  if (!encodedHeader || !encodedPayload || !signature) return null;

  const unsignedToken = `${encodedHeader}${TOKEN_SEPARATOR}${encodedPayload}`;
  const expectedSignature = createHmac("sha256", getSigningSecret()).update(unsignedToken).digest("base64url");
  const expected = Buffer.from(expectedSignature);
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload).toString("utf8")) as {
      sub: string;
      orgId: string;
      role: AuthedSession["role"];
      exp: number;
    };
    if (!payload.sub || !payload.orgId || !payload.role || !payload.exp) return null;
    if (payload.exp * 1000 <= Date.now()) return null;
    return {
      userId: payload.sub,
      organizationId: payload.orgId,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

/** Seconds until a session token expires (null when unparsable/expired). */
export function sessionTokenExpirySeconds(token: string): number | null {
  const [, encodedPayload] = token.split(TOKEN_SEPARATOR);
  if (!encodedPayload) return null;
  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload).toString("utf8")) as { exp?: number };
    if (!payload.exp) return null;
    return payload.exp - Math.floor(Date.now() / 1000);
  } catch {
    return null;
  }
}
