"use client";
import Header from "@/components/Header";
import { Button, Center, Container, PasswordInput, TextInput } from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login(){
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginResult, setLoginResult] = useState(null);
    
    async function login(){
        if(username === "" || password === "") return setLoginResult("empty");

        setLoginResult("loading");
        var res = await axios.post(location.origin + "/api/admin/login", { username, password });
        setLoginResult(res.data);
        if(res.data == "success") router.push("/");
    }

    return (
        <main>
            <Header border/>
            <Container className="h-screen">
                <Center className="h-4/6 w-full">
                    <div className="w-full">
                        <div className="w-full border-[1px] border-red-500 p-5">
                            <h1 className="text-2xl text-red-600 font-bold text-center">JKT48 Admin Login</h1>
                            {
                                loginResult != null &&
                                <h1 className="mt-3 text-red-600 font-bold text-center">{ resultText(loginResult) }</h1>
                            }
                            <TextInput className="mt-3" size="md" label="Username" placeholder="Masukkan Username"
                                onChange={e => setUsername(e.currentTarget.value)}/>
                            <hr className="my-5 bg-transparent text-red-500" style={{ border: "dotted 1px" }}/>
                            <PasswordInput className="mt-3" size="md" label="Password" placeholder="Masukkan Password"
                                onChange={e => setPassword(e.currentTarget.value)}/>
                            <hr className="my-5 bg-transparent text-red-500" style={{ border: "dotted 1px" }}/>
                        </div>
                        <Button className="mt-5 bg-red-500" variant="filled" size="md" radius="lg" fullWidth onClick={login}>Log in</Button>
                    </div>
                </Center>
            </Container>
        </main>
    );
}

function resultText(result){
    switch(result){
        case "empty": return "Username atau password tidak boleh kosong!";
        case "loading": return "Loading...";
        case "success": return "Login berhasil!";
        case "failed": return "Username atau password salah!";
        default: return "Terjadi kesalahan!"
    }
}