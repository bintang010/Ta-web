import { Button, Grid, Image, Select, TextInput, Textarea } from "@mantine/core";
import { NewsType, newsTypes } from "@/components/news/News";
import React, { useRef, useState } from 'react'
import newsFormDataStore, { defaultType, initialNewsFormData, setContent, setTitle, setType } from "./NewsStore";
import newsFormStateStore from "./NewsFormState";
import axios from "axios";

export default function NewsForm({ refetch }){
    const [newsData, setNewsData] = useState(initialNewsFormData);
    const [newsFormState, setNewsFormState] = useState(false);
    const [file, setFile] = useState(null);
    const { id, title, content, type, image, isEdit } = newsData.value;

    const inputFile = useRef(null);
    const newsImage = useRef(null);
    
    newsFormDataStore.subscribe(() => setNewsData(newsFormDataStore.getState()));
    newsFormStateStore.subscribe(() => setNewsFormState(newsFormStateStore.getState().value));

    async function actionNews(){
        const formData = new FormData();

        const data = newsFormDataStore.getState().value;
        for(const key in data){
            formData.append(key, data[key]);
        }
        if(isEdit){
            formData.delete("image");
            if(file != null) formData.append("image", file);
        } else {
            if(file == null) return alert("Image is required!");
        }

        await axios({
            method: isEdit ? "PATCH" : "POST",
            url: location.origin + "/api/news",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        });

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

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    async function setNewsImage(e){
        const currentFile = e.currentTarget.files[0];
        if(currentFile == null) return;
        newsImage.current.src = await toBase64(currentFile);
        setFile(currentFile);
    }
    
    return (
        <div className={"fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.3)] "
        + (newsFormState ? "" : "hidden")}>
            <div className={"w-full m-10 md:m-0 md:w-[60rem] min-h-[20rem] bg-red-500 text-white p-5 animate__animated "
             + (newsFormState ? "animate__fadeInDown" : "")}>
                <input type="hidden" name="id" value={id}/>
                <h1 className="text-2xl font-bold text-center">Buat Berita Baru<span className="float-right cursor-pointer" onClick={closeForm}>X</span></h1>
                <Grid className="mt-3">
                    <Grid.Col span={9} className="pe-4">
                        <TextInput className="mt-3" size="md" label="Judul" placeholder="Masukkan judul berita" value={title}
                            onChange={e => newsFormDataStore.dispatch(setTitle(e.target.value))}/>
                        <hr className="my-5 bg-transparent" style={{ border: "dotted 1px" }}/>
                        <Select size="md" label="Tipe" placeholder="Pilih tipe berita" checkIconPosition="left" defaultValue={defaultType} value={type}
                            data={newsTypes} onChange={val => newsFormDataStore.dispatch(setType(val))}/>
                        <NewsType className="mt-2" type={type}/>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <input type="file" accept=".jpg,.jpeg,.png" ref={inputFile} onChange={setNewsImage}  className="hidden"/>
                        <Image className="aspect-square" role="button" ref={newsImage} src={image ? `${location.origin}/images/${image}` : "https://picsum.photos/500"} onClick={() => inputFile.current.click()}/>
                    </Grid.Col>
                </Grid>
                <hr className="my-5 bg-transparent" style={{ border: "dotted 1px" }}/>
                <Textarea className="mt-3" size="md" label="Konten" placeholder="Masukkan konten berita" minRows={5} maxRows={15} autosize value={content}
                    onChange={e => newsFormDataStore.dispatch(setContent(e.target.value))}/>
                <hr className="my-5 bg-transparent" style={{ border: "dotted 1px" }}/>
                <Button className="mt-5" color="rgb(255, 255, 255)" variant="outline" size="md" radius="lg" fullWidth onClick={actionNews}>{isEdit ? "Edit" : "Post"} Berita</Button>
            </div>
        </div>
    );
}