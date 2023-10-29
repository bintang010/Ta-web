"use client";
import Header from "@/components/Header";
import News from "@/components/news/News";

export default function Admin(){
    return (
        <main>
            <Header/>
            <News isAdmin={true}/>
        </main>
    );
}