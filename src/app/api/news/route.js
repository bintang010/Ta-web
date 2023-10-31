import Client from "@/components/Client";

export async function GET(){
    const client = Client();
    const query = await client.query("SELECT * FROM news");
    client.end();
    return Response.json(query[0]);
}

export async function POST(req){
    const client = Client();
    try {
        const data = await req.json();
        const { title, content, type } = data;
        await client.execute("INSERT INTO news (title, content, type) VALUES (?, ?, ?)", [title, content, type]);
        
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
        const data = await req.json();
        const { id, title, content, type } = data;
        await client.execute("UPDATE news SET title=?, content=?, type=? WHERE id=?", [title, content, type, id]);
        
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
        console.log(data);
        await client.execute("DELETE FROM news WHERE id=?", [data.id]);

        client.end();
        return Response.json(data);
    } catch(err){
        console.error(err);
        client.end();
        return Response.error();
    }
}