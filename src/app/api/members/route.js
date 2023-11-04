import Client from "@/components/Client";

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const args = [];
    let randomQuery = "";

    if (searchParams.has("random") && searchParams.has("total")) {
        randomQuery = " ORDER BY RAND() LIMIT ?";
        args.push(parseInt(searchParams.get("total")));
    }
    const client = Client();
    const query = await client.query(`SELECT * FROM members${randomQuery}`, args);

    client.end();
    return Response.json(query[0]);
}