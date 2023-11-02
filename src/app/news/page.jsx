"use client";
import Header from "@/components/Header";
import { formatDate } from "@/components/news/News";
import { Container, Grid, GridCol, Image } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

async function fetchNews(searchParams){
    const res = await fetch(location.origin + "/api/news?id=" + searchParams.get("id"));
    return await res.json();
}

export default function News(){
    const searchParams = useSearchParams();
    let { data, isError, isLoading } = useQuery({ queryKey: ["news"], queryFn: () => fetchNews(searchParams) });

    if(isLoading) return <h1 className="text-center text-red-500 text-2xl">Loading...</h1>;
    if(isError) return <h1 className="text-center text-red-500 text-2xl">Terjadi kesalahan!</h1>;
    if(Array.isArray(data)) data = data[0];
    return (
        <main>
            <Header border/>
            <Container className="mt-3">
                <Grid>
                    <GridCol span={3}>
                        <div className="text-center mt-2 bg-pink-300 text-pink-700 p-3 text-xl font-medium rounded-md">Members</div>
                        <div className="border-2 border-pink-300 p-2 mt-2">
                            <Image src="https://picsum.photos/500"/>
                            <div className="text-center mt-2 bg-pink-300 text-pink-700 p-3 text-lg rounded-md">Lorem Ipsum</div>
                        </div>
                        <div className="border-2 border-pink-300 p-2 mt-2">
                            <Image src="https://picsum.photos/500"/>
                            <div className="text-center mt-2 bg-pink-300 text-pink-700 p-3 text-lg rounded-md">Lorem Ipsum</div>
                        </div>
                        <div className="border-2 border-pink-300 p-2 mt-2">
                            <Image src="https://picsum.photos/500"/>
                            <div className="text-center mt-2 bg-pink-300 text-pink-700 p-3 text-lg rounded-md">Lorem Ipsum</div>
                        </div>
                    </GridCol>
                    <GridCol span={9} className="mt-2">
                        <div>
                            <Image src={`${location.origin}/images/${data.image}`}/>
                            <h1 className="text-3xl font-extrabold mt-2">{ data.title }</h1>
                            <p className="mt-2 text-gray-600">{ formatDate(data.created_at) }</p>
                            <div>
                                { data.content.split("\n").map((text, i) => 
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