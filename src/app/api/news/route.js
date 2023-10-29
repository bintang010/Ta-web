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
        return Response.error();
    }
}