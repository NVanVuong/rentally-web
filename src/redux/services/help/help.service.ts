import { IUtiltity, IUtiltityResponse } from "@/interfaces/utility.interface"
import { creatApiWithAuth } from "../apiWithAuth.service"

const creatApiAuthWithAuth = creatApiWithAuth("helpApi", ["Help"])

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
