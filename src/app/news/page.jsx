"use client";
import Header from "@/components/Header";
import { formatDate } from "@/components/news/News";
import { Container, Grid, GridCol, Image } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const TOTAL = 3;
async function fetchNews(searchParams){
    const res = await fetch(location.origin + "/api/news?id=" + searchParams.get("id"));
    return await res.json();
}

async function fetchMembers(){
    const res = await fetch(location.origin + "/api/members?random&total=" + TOTAL);
    return await res.json();
}

export default function News(){
    const searchParams = useSearchParams();
    const newsQuery = useQuery({ queryKey: ["news"], queryFn: () => fetchNews(searchParams) });
    const membersQuery = useQuery({ queryKey: ["members"], queryFn: fetchMembers });

    if(newsQuery.isLoading || membersQuery.isLoading) return <h1 className="text-center text-red-500 text-2xl">Loading...</h1>;
    if(newsQuery.isError || membersQuery.isError) return <h1 className="text-center text-red-500 text-2xl">Terjadi kesalahan!</h1>;

    let newsData = newsQuery.data;
    if(Array.isArray(newsData)) newsData = newsData[0];
    return (
        <main>
            <Header border/>
            <Container className="mt-3">
                <Grid>
                    <GridCol span={3}>
                        <div className="text-center mt-2 bg-pink-300 text-pink-700 p-3 text-xl font-medium rounded-md">Members</div>
                        { membersQuery.data.map((dat, i) => 
                        <div key={i} className="border-2 border-pink-300 p-2 mt-2">
                            <Image className="aspect-square" src={`${location.origin}/images/${dat.image}`}/>
                            <div className="text-center mt-2 bg-pink-300 text-pink-700 p-3 text-lg rounded-md">{dat.name}</div>
                        </div>)
                        }
                    </GridCol>
                    <GridCol span={9} className="mt-2">
                        <div>
                            <Image src={`${location.origin}/images/${newsData.image}`}/>
                            <h1 className="text-3xl font-extrabold mt-2">{ newsData.title }</h1>
                            <p className="mt-2 text-gray-600">{ formatDate(newsData.created_at) }</p>
                            <div>
                                { newsData.content.split("\n").map((text, i) => 
                                <p className="mt-3" key={i}>
                                    { text }
                                </p>
                                ) }
                            </div>
                        </div>
                    </GridCol>
                </Grid>
            </Container>
        </main>
    );
}