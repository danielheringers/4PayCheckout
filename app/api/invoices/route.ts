import { NextResponse } from "next/server";

const API_URL = "https://hom.api.orbitspot.com/cbaservice/bank-slip/list";
const API_KEY = "2e9437cf-c12a-4c21-8119-7279025bbfd4";
const TOKEN =
  "eyJraWQiOiIzZWZLREVlME1paVRsTnRCRW1iR2pmVHFyNTVpRDNSbmphRUthSmhnZmx3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlZjIwODAwZS1kZDE3LTQ0MzQtOWFjMy1jNzJjNmVkODUzZGMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiY3VzdG9tOm1haW5UZW5hbnQiOiIyZTk0MzdjZi1jMTJhLTRjMjEtODExOS03Mjc5MDI1YmJmZDQiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9LeThkenpnaWoiLCJjb2duaXRvOnVzZXJuYW1lIjoiZWYyMDgwMGUtZGQxNy00NDM0LTlhYzMtYzcyYzZlZDg1M2RjIiwiYXVkIjoiNGx2MmVjZW43djc5MDdpdnZ0MzFxdW5ka2UiLCJldmVudF9pZCI6ImYxN2Y1ZjkxLWVhNDAtNGQ1YS04NTU0LWZkYWMxNjE0MmM1MCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzMzNDk2NDgyLCJuYW1lIjoiRGFuaWVsIEhlcmluZ2VyIiwiZXhwIjoxNzMzNTgyODgyLCJpYXQiOjE3MzM0OTY0ODIsImVtYWlsIjoiZGFuaWVsLmhlcmluZ2VyQHNlaWRvci5jb20ifQ.ZfmKNykwXHMlHiiOzG92fGmzdHrrY_eeBtTWBJmhFpkf-htB5tysNoePqZsYy5glWSigDsr87RbNu93jJhVLALA46Xld6NPj_ZCs3WFt0-W1E-Pw6QBpaGf_pBqqquCSkn7ayVNRbfYuOabO5U801KXzCo732Zd3q-_P8LvxAjjRrcXpRY-Fi62SoD9vFyba3kHgozJNFaXNCIPY7AwzCbpFZuVdWeTKJMstomz8cDoknBZKtUJiJ8pho4bX6RU9d-pNfTbuySjhnxrdBOFgtP-7H8OiZmN1m_V_Ws111Q30_JMQRbHIgDe7ytAmokwa_ykzExdHasgXAERmylHcGQ";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "25";
  const status = searchParams.get("status") || "all";

  let apiUrl = `${API_URL}?page=${page}&limit=${limit}&order=DESC&order_by=expedition_date`;

  if (status !== "all") {
    apiUrl += `&status=${status}`;
  }

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "sec-ch-ua-platform": '"Windows"',
        "Cache-Control": "no-store , no-cache",
        Referer: "https://hom.portal.orbitspot.com/",
        "sec-ch-ua":
          '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "x-api-key": API_KEY,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        Accept: "application/json",
        token: TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch invoices");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}
