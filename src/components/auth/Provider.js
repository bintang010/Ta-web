import { redirect } from "next/navigation";
import { CheckAuth } from "./Auth";

export async function AuthProvider({ children }){
    const redirectPath = await CheckAuth();
    if(redirectPath != null) redirect(redirectPath);
    return children;
}