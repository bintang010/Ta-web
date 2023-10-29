import { Container, Grid, Group, Image } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

async function fetchNews(){
    const res = await fetch(location.origin + "/api/news");
    return await res.json();
}

export default function News(){
    const { data, isError, isLoading } = useQuery({ queryKey: ["news"], queryFn: fetchNews });
    
    if(isLoading) return <h1 className="text-center text-red-500 text-2xl">Loading...</h1>;
    if(isError) return <h1 className="text-center text-red-500 text-2xl">Terjadi kesalahan!</h1>;
    return (
        <div className="bg-red-500 py-3 my-3">
            <Container className="py-3">
                <h1 className="text-3xl font-extrabold text-white text-center mt-3 mb-5">NEWS</h1>
                { data.map(dat => <NewsContent data={dat} key={dat.id}/>) }
            </Container>
        </div>
    );  
}

function NewsContent({ data }){
    const { title, content, type, created_at } = data;
    return (
        <Grid className="bg-white my-3 animate__animated animate__fadeIn">
            <Grid.Col span={{ base: 12, md: 3 }}>
                <Image className="animate__animated animate__fadeIn" src={"https://picsum.photos/500"} fallbackSrc="https://placehold.co/400x400?text=404+:("/>
            </Grid.Col>
            <Grid.Col span="auto">
                <div className="px-3 pb-3 md:px-0 md:pb-0">
                    <h1 className="font-bold text-2xl text-red-500 mt-3">{ title }</h1>
                    <p className="mt-3 text-gray-700">{ content.substr(0, 300) + "..." }</p>
                    <Group className="text-center w-fit mt-3">
                        <NewsType type={type}/>
                        <h1 className="text-sm text-gray-600">{ formatDate(created_at) }</h1>
                    </Group>
                </div>
            </Grid.Col>
        </Grid>
    );
}

function formatDate(datetime){
    const date = new Date(datetime);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return Intl.DateTimeFormat("id-ID", options).format(date);
}

function ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function NewsType({ type }){
    var color = null;
    switch(type){
        case "theater": color = "bg-blue-500"; break;
        case "new": color = "bg-red-500"; break;
        case "release": color = "bg-green-500"; break;
        default: color = "";
    }
    return <h1 className={"text-sm font-extrabold text-white px-2 py-1 rounded-sm " + color}>{ ucfirst(type) }</h1>
}