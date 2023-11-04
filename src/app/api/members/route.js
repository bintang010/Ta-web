import Client from "@/components/Client";

export async function GET(){
    const client = Client();
    const query = await client.query("SELECT * FROM members");
    return Response.json(query[0]);
}