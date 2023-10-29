'use client';
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import Autoplay from 'embla-carousel-autoplay';
import Header from "../components/Header";
import { useRef } from "react";
import News from "../components/news/News";

function Slide(){
    return (
        <Carousel.Slide>
            <Image className="animate__animated animate__fadeIn" src={"https://picsum.photos/1080/720"}/>
        </Carousel.Slide>
    );
}


export default function Home(){
    const autoplay = useRef(Autoplay({ delay: 4000 }));
    return (
        <main>
            <Header/>
            <Carousel withIndicators withControls loop
                slideSize={{ base: '100%', sm: '50%'}}
                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
                className="animate__animated animate__fadeIn">
                <Slide/>
                <Slide/>
                <Slide/>
                <Slide/>
                <Slide/>
            </Carousel>
            <News/>
        </main>
    );
}
