import { Container, Grid, Group, Image } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import NewsForm from "../admin/news/NewsForm";
import newsFormDataStore, { initialNewsFormData, setNewsData } from "../admin/news/NewsStore";
import newsFormStateStore, { setNewsFormState } from "../admin/news/NewsFormState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

async function fetchNews(){
    const res = await fetch(location.origin + "/api/news");
    return await res.json();
}

export default function News({ isAdmin }){
    const { data, isError, isLoading, refetch } = useQuery({ queryKey: ["news"], queryFn: fetchNews });

    if(isLoading) return <h1 className="text-center text-red-500 text-2xl">Loading...</h1>;
    if(isError) return <h1 className="text-center text-red-500 text-2xl">Terjadi kesalahan!</h1>;
    function createNews(){
        if(!isAdmin) return;
        try {
            newsFormDataStore.dispatch(setNewsData(initialNewsFormData.value));
            newsFormStateStore.dispatch(setNewsFormState(true));
        } catch(err){
            // console.error(err);
        }
    }
    return (
        <>
            <div className="bg-red-500 py-3 my-3">
                <Container className="py-3">
                    <h1 className={"text-3xl font-extrabold text-white text-center mt-3 mb-5" + (isAdmin ? " cursor-pointer" : "")}
                    onClick={createNews}>NEWS
                    {isAdmin && <span>+</span>}
                    </h1>
                    {
                        data.length > 0 ? data.map(dat => <NewsContent data={dat} refetch={refetch} isAdmin={isAdmin} key={dat.id}/>)
                        : <h1 className="text-center text-white text-2xl">Tidak ada berita...</h1>
                    }
                </Container>
            </div>
            { isAdmin && <NewsForm refetch={refetch}/> }
        </>
    );  
}

function NewsContent({ data, isAdmin, refetch }){
    const { id, title, content, type, created_at } = data;
    data.isEdit = true;
    function editNews(){
        newsFormDataStore.dispatch(setNewsData(data));
        newsFormStateStore.dispatch(setNewsFormState(true));
    }
    async function deleteNews(){
        const res = await confirm("Apakah kamu yakin akan menghapus berita ini?");
        if(!res) return;
        await axios.delete(location.origin + "/api/news", { data: { id } });
        refetch();
    }
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
                        {isAdmin &&
                        <>
                            <FontAwesomeIcon className="text-2xl text-yellow-500 cursor-pointer" icon={faPencil} onClick={editNews}/>
                            <FontAwesomeIcon className="text-2xl text-red-500 cursor-pointer" icon={faTrash} onClick={deleteNews}/>
                        </>}
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

export const newsTypes = [
    {
        label: "Theater",
        value: "theater"
    },
    {
        label: "New",
        value: "new"
    },
    {
        label: "Release",
        value: "release"
    }
];
export function NewsType({ className, type }){
    var color = null;
    switch(type){
        case "theater": color = "bg-blue-500"; break;
        case "new": color = "bg-red-500"; break;
        case "release": color = "bg-green-500"; break;
        default: color = "";
    }
    return <h1 className={`w-fit text-sm font-extrabold text-white px-2 py-1 rounded-sm ${className} ${color}`}>{ ucfirst(type) }</h1>
}