import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import emblaCarouselAutoplay from "embla-carousel-autoplay";
import { useRef } from "react";

async function fetchCarousel(){
    const res = await fetch(location.origin + "/api/carousel");
    return await res.json();
}

function Slide({ isBtnAdd, image, refetch, isAdmin }){
    const inputFile = useRef(null);
    async function uploadImage(e){
        const file = e.currentTarget.files[0];
        if(!file) return;

        const formData = new FormData();
        formData.append("image", file);
        await axios({
            method: "POST",
            url: location.origin + "/api/admin/carousel",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        });
        await refetch();
    }

    async function deleteImage(){
        const conf = await confirm("Apakah kamu yakin ingin menghapus gambar ini dari carousel?");
        if(!conf) return;
        await axios.delete(location.origin + "/api/admin/carousel", { data: { image } });
        await refetch();
    }
    return (
        <>
            <Carousel.Slide className={"min-h-[30rem] w-1/3 " + (isBtnAdd ? "flex justify-center items-center bg-gray-500 " : "") + (isAdmin ? "cursor-pointer" : "")}
                onClick={() => isAdmin && (isBtnAdd ? inputFile.current.click() : deleteImage())}>
                { isBtnAdd ? <FontAwesomeIcon className="text-[5rem] text-white" icon={faPlusCircle}/>
                : <Image className="w-full h-full animate__animated animate__fadeIn" src={`${location.origin}/carousel/${image}`}/> }
                <input className="hidden" ref={inputFile} type="file" accept=".jpg,.jpeg,.png" onChange={uploadImage}/>
            </Carousel.Slide>
        </>
    );
}

export default function CarouselNews({ isAdmin }){
    const { data, isError, isLoading, refetch } = useQuery({ queryKey: ["carousel"], queryFn: fetchCarousel });
    const autoplay = useRef(emblaCarouselAutoplay({ delay: 4000 }));
    if(isLoading) return <></>;
    if(isError) return <h1 className="text-center text-red-500 text-2xl">Terjadi kesalahan!</h1>;
    return (
        <Carousel
            withIndicators={true} withControls={true} loop={true}
            slideSize={{ base: '100%', sm: '50%'}}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            className="animate__animated animate__fadeIn">
            { data.map((img, i) => <Slide refetch={refetch} isAdmin={isAdmin} image={img} key={i}/>) }
            { isAdmin && <Slide isBtnAdd={true} isAdmin={isAdmin} refetch={refetch}/> }
        </Carousel>
    );
}