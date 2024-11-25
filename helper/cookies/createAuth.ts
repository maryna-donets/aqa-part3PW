import { request } from "@playwright/test";
import * as dotenv from 'dotenv';
dotenv.config();

//let sid: string;
export default async function getAuthSid (email: string, password: string){
const contextRequest = await request.newContext();
const response = await contextRequest.post('/api/auth/signin', {
    data : {
        "email": email,
        "password": password,
        "remember": false
    },
});
if (!response.ok()) {
    console.error("Авторизація не вдалася", await response.text());
    return null;
}
const cookie = response.headers()['set-cookie']
if(cookie){
    const array = cookie.split('/n')
    for (const cookie of array){
        if(cookie.trim().startsWith('sid=')){
            return cookie.trim().split('=')[1].split(';')[0];
           // sid = (cookie.trim().split('=')[1]).split(';')[0]
           // break;
        }
    }
}
return null;
//return sid
}