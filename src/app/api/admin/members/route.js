import Client from "@/components/Client";
import { randomUUID } from "crypto";
import { rmSync, writeFileSync } from "fs";
import path from "path";

export async function POST(req) {
    const client = Client();
    try {
        const data = await req.formData();
        const image = data.get("image");
        const imageName = randomUUID().replaceAll("-", "");

        const imagePath = path.join(process.cwd(), "public/images", imageName);
        writeFileSync(imagePath, Buffer.from(await image.arrayBuffer()));

        await client.execute("INSERT INTO members (name, image) VALUES (?, ?)", [data.get("name"), imageName]);
        client.end();
        return Response.json(true);
    } catch (err) {
        console.error(err);
        return Response.error();
    }
}

export async function PATCH(req) {
    const client = Client();
    try {
        const data = await req.formData();
        const image = data.get("image");
        let imageQuery = "";

        const args = [data.get("name")];
        if (image != null) {
            await deleteImageById(client, data.get("id"));
            imageQuery = ", image=?";

            const imageName = randomUUID().replaceAll("-", "");
            args.push(imageName);

            const imagePath = path.join(process.cwd(), "public/images", imageName);
            writeFileSync(imagePath, Buffer.from(await image.arrayBuffer()));
        }
        args.push(data.get("id"));

        await client.execute(`UPDATE members SET name=?${imageQuery} WHERE id=?`, args);

        client.end();
        return Response.json(data);
    } catch (err) {
        console.error(err);
        return Response.error();
    }
}

export async function DELETE(req) {
    const client = Client();
    try {
        const { id } = await req.json();
        await deleteImageById(client, id);
        await client.execute("DELETE FROM members WHERE id=?", [id]);

        client.end();
        return Response.json(true);
    } catch (err) {
        console.error(err);
        return Response.error();
    }
}

async function deleteImageById(client, id) {
    const query = await client.query("SELECT image FROM members WHERE id=?", id);
    const deleteImageName = query[0][0].image;
    const deleteImagePath = path.join(process.cwd(), "public/images", deleteImageName);
    rmSync(deleteImagePath);
}