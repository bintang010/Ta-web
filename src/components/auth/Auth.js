"use server";
import { randomUUID } from "crypto";
import { cookies, headers } from "next/headers";
import Client from "../Client";

const keyname = "auth_key";

export async function SetAuthKey(id){
    const client = Client();
    const cookie = randomUUID();
    await client.execute("UPDATE admin SET cookie=? WHERE id=?", [cookie, id]);
    cookies().set(keyname, cookie, { sameSite: "strict", secure: true, httpOnly: true });
    client.end();
}

export async function CheckAuthKey(){
    const client = Client();
    const key = cookies().get(keyname);
    const query = await client.query("SELECT id FROM admin WHERE cookie=?", [key ? key.value : null]);
    client.end();
    return query[0].length > 0;
}

export async function CheckAuth(){
    const client = Client();
    // headers().forEach((val, key) => console.log(key + " : " + val));

    const pathname = headers().get("referer");
    const isAdminPathname = pathname.startsWith("/admin") && !pathname.endsWith("/login");
    const isLoginPathname = pathname == "/admin/login";
    const auth = await CheckAuthKey();

    client.end();
    if(isAdminPathname && !auth) return "/admin/login";
    else if(isLoginPathname && auth) return "/admin";
    return null;
}