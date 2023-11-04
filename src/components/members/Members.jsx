import { faPencil, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Center, Container, Grid, Image, TextInput } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import "./style.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Member({ isBtnAdd, isAdmin, data, refetch }){
    const [name, setName] = useState("");
    const inputFile = useRef(null);

    useEffect(() => {
        if(data != undefined && name === "") setName(data.name);
    }, [data]);

    async function uploadImage(){
        if(name === "") return alert("Nama harus di-isi sebelum menambahkan gambar!");
        inputFile.current.click();
    }

    async function addMember(){
        if(data == undefined && inputFile.current.files.length < 1) return;

        const formData = new FormData();
        if(data != null) formData.append("id", data.id);
        formData.append("name", name);
        if(inputFile.current.files.length > 0) formData.append("image", inputFile.current.files[0]);

        await axios({
            method: data != undefined ? "PATCH" : "POST",
            url: location.origin + "/api/admin/members",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        });
        if(data == undefined) setName("");
        await refetch();
    }

    async function deleteMember(){
        const conf = await confirm("Apakah kamu yakin ingin menghapus member ini?");
        if(!conf) return;

        await axios.delete(location.origin + "/api/admin/members", { data });
        await refetch();
    }
    return (
        <Grid.Col span={3}>
            <div className={"border-2 border-pink-300 w-full h-full p-2 " + (isBtnAdd ? "cursor-pointer" : "")}>
                <input ref={inputFile} onChange={addMember} type="file" className="hidden"/>
                {
                    isBtnAdd ? 
                    <Center className="bg-gray-500 aspect-square" onClick={uploadImage}>
                        <FontAwesomeIcon className="text-[5rem] text-white" icon={faPlusCircle}/>
                    </Center>
                    : <Image className={"aspect-square " + (isAdmin ? "cursor-pointer" : "")} src={`${location.origin}/images/${data.image}`} onClick={uploadImage}/>
                }
                {
                    isAdmin ?
                    <div className="relative">
                        <TextInput placeholder="Nama Member" size="md" variant="unstyled" className="text-center mt-2 bg-pink-300 py-[.325rem] rounded-md input-member"
                            onChange={e => setName(e.currentTarget.value)} onKeyDown={e => e.key === "Enter" && addMember()} value={name}/>
                        {
                            !isBtnAdd && <div className="absolute top-0 right-0 me-2 translate-y-1/2">
                                <FontAwesomeIcon className="text-2xl text-red-500 cursor-pointer ms-3" onClick={deleteMember} icon={faTrash}/>
                            </div>
                        }
                    </div>
                    : <div className="text-center mt-2 bg-pink-300 text-pink-700 p-3 text-lg rounded-md">{data != undefined && data.name}</div>
                }
            </div>
        </Grid.Col>
    );
}

async function fetchMembers(){
    const res = await fetch(location.origin + "/api/members");
    return await res.json();
}

export default function Members(){
    const { data, isError, isLoading, refetch } = useQuery({ queryKey: ["members"], queryFn: fetchMembers });
    if(isLoading) return <></>;
    if(isError) return <h1 className="text-center text-red-500 text-2xl">Terjadi kesalahan!</h1>;
    return (
        <>
            <Center>
                <div className="text-center mt-2 bg-pink-300 text-pink-700 py-3 px-8 text-xl font-medium rounded-md">Members</div>
            </Center>
            <Container className="my-5">
                <Grid gutter="sm" className="px-2 py-2">
                    { data.map((dat, i) => <Member data={dat} isAdmin={true} key={i} refetch={refetch}/>) }
                    <Member isBtnAdd={true} isAdmin={true} refetch={refetch}/>
                </Grid>
            </Container>
        </>
    );
}