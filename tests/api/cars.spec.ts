import test, { expect } from "@playwright/test";
import {users} from '../../test-data/users'
import {cars} from '../../test-data/cars'
import getHeader from '../../helper/cookies/saveHeader'
import addCar from '../../helper/addcar/addCarApi'
import {errors} from '../../test-data/errors'

test.describe('Add cars', ()=> {
    let authHeader: { Cookie: string; };
    test.beforeAll(async()=>{
        authHeader = await getHeader(users.user1.email, users.user1.password)
    })

    test("Add a car", async({request})=>{
        const response = await addCar(authHeader, cars.validCar.carBrandId, cars.validCar.carModelId, cars.validCar.mileage)
          expect(response.status).toBe(201)
          expect(response.body.status).toBe('ok')
          expect(response.body.data).toMatchObject(cars.validCar);
    })

    test("Invalid car brand", async({request})=>{
        const response = await addCar(authHeader, cars.invalidBrandCar.carBrandId, cars.invalidBrandCar.carModelId, cars.invalidBrandCar.mileage)
          expect(response.status).toBe(400)
          expect(response.body.status).toBe('error')
          expect(response.body.message).toBe(errors.brand)
    })

    test("Invalid car model", async({request})=>{
        const response = await addCar(authHeader, cars.invalidModelCar.carBrandId, cars.invalidModelCar.carModelId, cars.invalidModelCar.mileage)
          expect(response.status).toBe(400)
          expect(response.body.status).toBe('error')
          expect(response.body.message).toBe(errors.model)
    })
})