import { cookies } from "next/headers";
import { NextResponse } from "next/server"
import Client from "./components/Client";

const keyname = "session_key";

export default async function middleware(req) {
    const headers = new Headers(req.headers);
    headers.set("referer", req.nextUrl.pathname);
    return NextResponse.next({ headers });
}