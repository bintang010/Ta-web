import { Container, Group, Image } from "@mantine/core";

export default function Header(){
    return (
        <Container className="pb-3 text-red-600">
            <Group>
                <Image w={65} src="/icon.svg"/>
                <p className="text-2xl font-bold">JKT48</p>
            </Group>
        </Container>
    );
}