"use client";
import Header from "@/components/Header";
import Members from "@/components/members/Members";

export default function MembersPage(){
    return (
        <main>
            <Header border={true}/>
            <Members/>
        </main>
    );
}