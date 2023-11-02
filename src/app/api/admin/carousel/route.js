import { randomUUID } from "crypto";
import { rmSync, writeFileSync } from "fs";
import path from "path";

export async function POST(req){
    try {
        const data = await req.formData();
        /** @type {File} */
        const image = data.get("image");
        const imageName = randomUUID().replaceAll("-", "");
        const imagePath = path.join(process.cwd(), "public/carousel", imageName);
        writeFileSync(imagePath, Buffer.from(await image.arrayBuffer()));

        return Response.json(true);
    } catch(err){
        console.error(err);
        return Response.error();
    }
}

export async function DELETE(req){
    try {
        const data = await req.json();
        const imagePath = path.join(process.cwd(), "public/carousel", data.image);
        rmSync(imagePath);

        return Response.json(true);
    } catch(err){
        console.error(err);
        return Response.error();
    }
}