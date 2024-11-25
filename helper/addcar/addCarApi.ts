import { request } from "@playwright/test";

export default async function addCar (header: { Cookie: string }, carBrand: any, carModel: any, mile: any){
    const contextRequest = await request.newContext()
    const response = await contextRequest.post('/api/cars',
        {
           headers: header 
        ,
        data:
        {
            "carBrandId": carBrand,
            "carModelId": carModel,
            "mileage": mile
        }}
    )
    return {
        status: response.status(),
        body: await response.json(),
    };
}