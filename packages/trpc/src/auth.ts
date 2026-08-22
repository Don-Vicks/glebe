import { createHmac, timingSafeEqual } from "node:crypto";
import type { AuthedSession } from "./context";

const TOKEN_SEPARATOR = ".";

function base64UrlEncode(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function base64UrlDecode(input: string) {
  return Buffer.from(input, "base64url");
}

function getSigningSecret() {
  return process.env.ORGSITES_AUTH_SECRET ?? "dev-only-auth-secret-change-me";
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

