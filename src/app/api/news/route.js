import Client from "@/components/Client";

export async function GET(req){
    const searchParams = req.nextUrl.searchParams;

    const client = Client();
    const hasId = searchParams.has("id");
    const args = ["SELECT * FROM news"];
    if(hasId){
        args[0] += " WHERE id=?";
        args.push([searchParams.get("id")]);
    }

    const query = await client.query(...args);
    client.end();

    let resp = null;
    if(hasId && query[0].length > 0) resp = query[0][0];
    else if(hasId && query[0].length === 0) resp = {};
    else resp = query[0];
    return Response.json(resp);
}