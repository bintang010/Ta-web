import { NextResponse } from "next/server"

export default async function middleware(req) {
    const headers = new Headers(req.headers);
    headers.set("referer", req.nextUrl.pathname);
    return NextResponse.next({ headers });
}