'use client';
import Header from "../components/Header";
import News from "../components/news/News";
import CarouselNews from "@/components/news/CarouselNews";

export default function Home(){
    return (
        <main>
            <Header/>
            <CarouselNews/>
            <News/>
        </main>
    );
}
