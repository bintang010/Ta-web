import { CheckAuthKey } from "@/components/auth/Auth";

export async function GET(){
    const auth = await CheckAuthKey();
    return Response.json(auth);
}