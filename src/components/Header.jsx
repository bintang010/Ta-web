import { Container, Group, Image } from "@mantine/core";
import Link from "next/link";

export default function Header({ border, isAdmin }){
    return (
        <div className={border ? "border-b-[1px] border-red-500" : ""}>
            <Container className="pb-3 text-red-600">
                <Group>
                    <Link href="/">
                        <Image w={65} src="/icon.svg"/>
                    </Link>
                    <Link href="/">
                        <p className="text-2xl font-bold">JKT48</p>
                    </Link>
                    <Link href={isAdmin ? "/admin/members" : "/members"} className="ml-auto border-b-2 border-red-500">
                        <p className="text-xl font-bold">Members</p>
                    </Link>
                </Group>
            </Container>
        </div>
    );
}