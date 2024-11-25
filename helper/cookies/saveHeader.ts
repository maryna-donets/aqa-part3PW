import getAuthSid from "./createAuth";
import * as dotenv from 'dotenv';
dotenv.config();

export default async function getHeader (email:string , password:string) {
    const sid = await getAuthSid(email, password) 
    if (!sid) {
        throw new Error("Не вдалося отримати SID");
    }
    return { Cookie: `sid=${sid}` };
}
