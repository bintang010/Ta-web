import { Button, Select, TextInput, Textarea } from "@mantine/core";
import axios from "axios";
import { NewsType, newsTypes } from "@/components/news/News";
import React, { useState } from 'react'
import newsFormDataStore, { defaultType, initialNewsFormData, setContent, setTitle, setType } from "./NewsStore";
import newsFormStateStore from "./NewsFormState";

export default function NewsForm({ refetch }){
    const [newsData, setNewsData] = useState(initialNewsFormData);
    const [newsFormState, setNewsFormState] = useState(false);
    const { id, title, content, type, isEdit } = newsData.value;

    newsFormDataStore.subscribe(() => setNewsData(newsFormDataStore.getState()));
    newsFormStateStore.subscribe(() => setNewsFormState(newsFormStateStore.getState().value));

    async function actionNews(){
        const formData = [location.origin + "/api/news", newsData.value];
        if(isEdit) await axios.patch(...formData);
        else await axios.post(...formData);

        await refetch();
        resetForm();
    }

    function resetForm(){
        try {
            newsFormStateStore.dispatch(setNewsFormState(false));
            newsFormDataStore.dispatch(setNewsData(initialNewsFormData));
        } catch(err){
            // console.error(err);
        }
    }

    function closeForm(){
        try {
            newsFormStateStore.dispatch(setNewsFormState(false));
        } catch(err){
            // console.error(err);
        }
    }

    return (
        <div className={"fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.3)] "
        + (newsFormState ? "" : "hidden")}>
            <div className={"w-full m-10 md:m-0 md:w-[60rem] min-h-[20rem] bg-red-500 text-white p-5 animate__animated "
             + (newsFormState ? "animate__fadeInDown" : "")}>
                <input type="hidden" name="id" value={id}/>
                <h1 className="text-2xl font-bold text-center">Buat Berita Baru<span className="float-right cursor-pointer" onClick={closeForm}>X</span></h1>
                <TextInput className="mt-3" size="md" label="Judul" placeholder="Masukkan judul berita" value={title}
                    onChange={e => newsFormDataStore.dispatch(setTitle(e.target.value))}/>
                <hr className="my-5 bg-transparent" style={{ border: "dotted 1px" }}/>
                <Select size="md" label="Tipe" placeholder="Pilih tipe berita" checkIconPosition="left" defaultValue={defaultType} value={type}
                    data={newsTypes} onChange={val => newsFormDataStore.dispatch(setType(val))}/>
                <NewsType className="mt-2" type={type}/>
                <hr className="my-5 bg-transparent" style={{ border: "dotted 1px" }}/>
                <Textarea className="mt-3" size="md" label="Konten" placeholder="Masukkan konten berita" minRows={5} maxRows={15} autosize value={content}
                    onChange={e => newsFormDataStore.dispatch(setContent(e.target.value))}/>
                <hr className="my-5 bg-transparent" style={{ border: "dotted 1px" }}/>
                <Button className="mt-5" color="rgb(255, 255, 255)" variant="outline" size="md" radius="lg" fullWidth onClick={actionNews}>{isEdit ? "Edit" : "Post"} Berita</Button>
            </div>
        </div>
    );
}