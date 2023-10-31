import Client from "@/components/Client";
import { randomUUID } from "crypto";
import { writeFileSync } from "fs";
import path from "path";

export async function GET(){
    const client = Client();
    const query = await client.query("SELECT * FROM news");
    client.end();
    return Response.json(query[0]);
}

export async function POST(req){
    const client = Client();
    try {
        const data = await req.formData();
        const image = data.get("image");
        const imageName = randomUUID().replaceAll("-", "");

        const imagePath = path.join(process.cwd(), "public/images", imageName);
        writeFileSync(imagePath, Buffer.from(await image.arrayBuffer()));

        const args = [data.get("title"), data.get("content"), data.get("type"), imageName];
        await client.execute("INSERT INTO news (title, content, type, image) VALUES (?, ?, ?, ?)", args);
        
        client.end();
        return Response.json(data);
    } catch(err){
        console.error(err);
        client.end();
        return Response.error();
    }
}

export async function PATCH(req){
    const client = Client();
    try {
        const data = await req.formData();
        const image = data.get("image");
        let imageQuery = "";

        const args = [data.get("title"), data.get("content"), data.get("type")];
        
        if(image != null){
            imageQuery = ", image=?";
            const imageName = randomUUID().replaceAll("-", "");
            args.push(imageName);

            const imagePath = path.join(process.cwd(), "public/images", imageName);
            writeFileSync(imagePath, Buffer.from(await image.arrayBuffer()));
        }
        args.push(data.get("id"));

        await client.execute(`UPDATE news SET title=?, content=?, type=?${imageQuery} WHERE id=?`, args);
        
        client.end();
        return Response.json(data);
    } catch(err){
        console.error(err);
        client.end();
        return Response.error();
    }
}

export async function DELETE(req){
    const client = Client();
    try {
        const data = await req.json();
        await client.execute("DELETE FROM news WHERE id=?", [data.id]);

        client.end();
        return Response.json(data);
    } catch(err){
        console.error(err);
        client.end();
        return Response.error();
    }
}