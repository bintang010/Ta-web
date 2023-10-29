import { SetAuthKey } from "@/components/auth/Auth";
import Client from "@/components/Client";
import { NextResponse } from "next/server";

export async function POST(req){
    const client = Client();
    var data = null;
    try {
        const { username, password } = await req.json();
        const query = await client.query("SELECT id FROM admin WHERE username=? AND password=?", [username, password]);
        data = query[0].length > 0 ? "success" : "failed";

        if(data == "success") await SetAuthKey(query[0][0].id);
    } catch(err){
        data = "error";
        console.error(err);
    }
    client.end();
    
    return NextResponse.json(data);
}