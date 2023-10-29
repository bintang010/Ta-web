import { Button, Select, TextInput, Textarea } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { NewsType, newsTypes } from "../news/News";

const defaultType = "theater";
export default function NewsForm({ state, setState, refetch }){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [type, setType] = useState(defaultType);

    async function addNews(){
        await axios.post(location.origin + "/api/news", { title, content, type });
        refetch();
        setState(false);
    }

    return (
        <div className={"fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.3)] "
        + (state ? "" : "hidden")}>
            <div className={"w-full m-10 md:m-0 md:w-[60rem] min-h-[20rem] bg-red-500 text-white p-5 animate__animated "
             + (state ? "animate__fadeInDown" : "")}>
                <h1 className="text-2xl font-bold text-center">Buat Berita Baru<span className="float-right cursor-pointer" onClick={() => setState(false)}>X</span></h1>
                <TextInput className="mt-3" size="md" label="Judul" placeholder="Masukkan judul berita"
                    onChange={e => setTitle(e.target.value)}/>
                <hr className="my-5 bg-transparent" style={{ border: "dotted 1px" }}/>
                <Select size="md" label="Tipe" placeholder="Pilih tipe berita" checkIconPosition="left" defaultValue={defaultType}
                    data={newsTypes} onChange={val => setType(val)}/>
                <NewsType className="mt-2" type={type}/>
                <hr className="my-5 bg-transparent" style={{ border: "dotted 1px" }}/>
                <Textarea className="mt-3" size="md" label="Konten" placeholder="Masukkan konten berita" minRows={5} maxRows={15} autosize
                    onChange={e => setContent(e.target.value)}/>
                <hr className="my-5 bg-transparent" style={{ border: "dotted 1px" }}/>
                <Button className="mt-5" color="rgb(255, 255, 255)" variant="outline" size="md" radius="lg" fullWidth onClick={addNews}>Post Berita</Button>
            </div>
        </div>
    );
}