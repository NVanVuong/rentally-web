import { IUtiltityResponse } from "@/interfaces/utility.interface"
import { creatApiWithAuth } from "../apiWithAuth.service"

const creatApiAuthWithAuth = creatApiWithAuth("helpApi", ["Help"])

export const helpApi = creatApiAuthWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getUtilities: builder.query<IUtiltityResponse, string>({
            query: () => ({
                url: "/utilities"
            })
        })

        // UploadImages: builder.mutation<>({
        //     query: (body) => ({
        //         url: "/auth/forgot-password/verify",
        //         method: "POST",
        //         body
        //     })
        // }),
    })
})

export const { useGetUtilitiesQuery } = helpApi
