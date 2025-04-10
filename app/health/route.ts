import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  return new Response(JSON.stringify({ status: "ok" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
