import { NextRequest, NextResponse } from "next/server";

const allowedActions = new Set(["login", "signup", "me", "logout"]);

export async function GET(request: NextRequest, { params }: { params: { action: string } }) {
  return proxy(request, params.action);
}

export async function POST(request: NextRequest, { params }: { params: { action: string } }) {
  return proxy(request, params.action);
}

async function proxy(request: NextRequest, action: string) {
  if (!allowedActions.has(action)) return NextResponse.json({ message: "Not found" }, { status: 404 });

  const apiBaseUrl = process.env.API_BASE_URL ?? "http://localhost:4000";
  const headers = new Headers({ accept: "application/json" });
  const cookie = request.headers.get("cookie");
  if (cookie) headers.set("cookie", cookie);

  let body: string | undefined;
  if (request.method !== "GET") {
    headers.set("content-type", "application/json");
    body = await request.text();
  }

  const response = await fetch(`${apiBaseUrl}/v1/auth/${action}`, {
    method: request.method,
    headers,
    body,
    cache: "no-store",
  });

  const result = new NextResponse(response.body, {
    status: response.status,
    headers: { "content-type": response.headers.get("content-type") ?? "application/json" },
  });
  const setCookie = response.headers.get("set-cookie");
  if (setCookie) result.headers.set("set-cookie", setCookie);
  return result;
}
