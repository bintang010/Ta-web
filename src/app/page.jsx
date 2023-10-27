'use client';
import { Carousel } from "@mantine/carousel";
import { Container, Grid, GridCol, Group, Image } from "@mantine/core";
import Autoplay from 'embla-carousel-autoplay';
import Header from "./components/Header";
import { useRef } from "react";

function Slide(){
    return (
        <Carousel.Slide>
            <Image className="animate__animated animate__fadeIn" src={"https://picsum.photos/1080/720"}/>
        </Carousel.Slide>
    );
}

function Berita(){
    return (
        <Grid className="bg-white my-3 animate__animated animate__fadeIn">
            <Grid.Col span={{ base: 12, md: 3 }}>
                <Image className="animate__animated animate__fadeIn" src={"https://picsum.photos/500"}/>
            </Grid.Col>
            <Grid.Col span="auto">
                <div className="px-3 pb-3 md:px-0 md:pb-0">
                    <h1 className="font-bold text-2xl text-red-500 mt-3">Lorem ipsum dolor sit amet</h1>
                    <p className="mt-3 text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue risus elit, ac lacinia libero luctus in. Maecenas dictum sit amet massa eu posuere. Pellentesque id quam at massa dictum bibendum. Nunc consequat quis justo a dictum. Fusce porttitor nibh vitae sem egestas, quis ullamcorper nisl varius...</p>
                    <Group className="text-center w-fit mt-3">
                        <h1 className="text-sm font-extrabold text-white bg-blue-500 px-2 py-1 rounded-sm">Theater</h1>
                        <h1 className="text-sm text-gray-600">25 Oktober 2023</h1>
                    </Group>
                </div>
            </Grid.Col>
        </Grid>
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
            <div className="bg-red-500 py-3 my-3">
                <Container className="py-3">
                    <h1 className="text-3xl font-extrabold text-white text-center mt-3 mb-5">NEWS</h1>
                    <Berita/>
                    <Berita/>
                    <Berita/>
                    <Berita/>
                    <Berita/>
                </Container>
            </div>
        </main>
    );
}
