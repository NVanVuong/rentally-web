import { IUtiltity, IUtiltityResponse } from "@/interfaces/utility.interface"
import { createApiWithAuth } from "../apiWithAuth.service"
import axios from "axios"
import { IProvince, IDistrict } from "@/interfaces/location.interface"

export const apiGetPublicProvinces = async (): Promise<IProvince[]> => {
    try {
        const response = await axios.get("https://vapi.vnappmob.com/api/province/")
        return response.data.results as IProvince[]
    } catch (error) {
        console.log(error)
        // Có thể bạn muốn xử lý lỗi ở đây, ví dụ in ra lỗi hoặc ném lỗi cho phía gọi hàm xử lý.
        throw error
    }
}

export const apiGetPublicDistricts = async (province_id: string): Promise<IDistrict[]> => {
    try {
        const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${province_id}`)
        return response.data.results as IDistrict[]
    } catch (error) {
        console.log(error)
        throw error
    }
}

const creatApiAuthWithAuth = createApiWithAuth("helpApi", ["Help"])

export const helpApi = creatApiAuthWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getUtilities: builder.query<IUtiltity[], string>({
            query: () => ({
                url: "/utilities"
            }),
            transformResponse: (response: IUtiltityResponse) => {
                const utilities = response.data.utilities
                const uniqueNames = new Set<string>()
                const uniqueUtilities: IUtiltity[] = []

                for (const item of utilities) {
                    if (!uniqueNames.has(item.name)) {
                        uniqueNames.add(item.name)
                        uniqueUtilities.push(item)
                    }
                }

                return uniqueUtilities
            }
        }),

        UploadImages: builder.mutation<{ status: string; message: string; data: string[] }, FormData>({
            query: (body) => ({
                url: "/aws/upload",
                method: "POST",
                body
            })
        })
    })
})

export const { useGetUtilitiesQuery, useUploadImagesMutation } = helpApi
