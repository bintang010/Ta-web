import Client from "@/components/Client";

const client = Client();
export async function GET(){
    var query = await client.query("SELECT * FROM news");
    return Response.json(query[0]);
}