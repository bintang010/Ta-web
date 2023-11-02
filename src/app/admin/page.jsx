'use client';
import Header from "@/components/Header";
import CarouselNews from "@/components/news/CarouselNews";
import News from "@/components/news/News";

export default function Home(){
    return (
        <main>
            <Header/>
            <CarouselNews/>
            <News isAdmin={true}/>
        </main>
    );
}
