'use client';
import Header from "@/components/Header";
import Members from "@/components/members/Members";
import CarouselNews from "@/components/news/CarouselNews";
import News from "@/components/news/News";

export default function Home(){
    return (
        <main>
            <Header isAdmin={true}/>
            <CarouselNews isAdmin={true}/>
            <News isAdmin={true}/>
            <Members isAdmin={true}/>
        </main>
    );
}
