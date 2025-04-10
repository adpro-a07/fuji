export async function GET() {
  return new Response(JSON.stringify({ status: "ok", message: "Health is good!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
