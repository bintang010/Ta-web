import Header from "@/app/components/Header";
import { Button, Center, Container, PasswordInput, TextInput } from "@mantine/core";

export default function Login(){
    return (
        <main>
            <div className="fixed w-full border-b-[1px] border-red-500">
                <Header/>
            </div>
            <Container className="h-screen">
                <Center className="h-4/6 w-full">
                    <div className="w-full">
                        <div className="w-full border-[1px] border-red-500 p-5">
                            <h1 className="text-2xl text-red-600 font-bold text-center">JKT48 Admin Login</h1>
                            <TextInput className="mt-3" size="md" label="Username" placeholder="Masukkan Username"/>
                            <hr className="my-5 bg-transparent text-red-500" style={{ border: "dotted 1px" }}/>
                            <PasswordInput className="mt-3" size="md" label="Password" placeholder="Masukkan Password"/>
                            <hr className="my-5 bg-transparent text-red-500" style={{ border: "dotted 1px" }}/>
                        </div>
                        <Button className="mt-5" color="rgb(239, 68, 68)" variant="filled" size="md" radius="lg" fullWidth>Log in</Button>
                    </div>
                </Center>
            </Container>
        </main>
    );
}