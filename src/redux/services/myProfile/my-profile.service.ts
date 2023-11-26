import { IMyInfoResponse, IUpdateMyInfoRequest, IUpdatePassword, IUsersResponse } from "@/interfaces/user.interface"
import { createApiWithAuth } from "../apiWithAuth.service"

const creatApiMyProfileWithAuth = createApiWithAuth("myProdileApi", ["MyInfo"])
export const myProdileApi = creatApiMyProfileWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        updateMyInfo: builder.mutation<IMyInfoResponse, IUpdateMyInfoRequest>({
            query: (formData) => {
                return {
                    url: `/users/me`,
                    method: "PUT",
                    body: formData
                }
            },
            invalidatesTags: ["MyInfo"]
        }),
        updatePassword: builder.mutation<IUsersResponse, IUpdatePassword>({
            query: (body) => {
                return {
                    url: `/users/me/password`,
                    method: "PUT",
                    body: body
                }
            },
            invalidatesTags: ["MyInfo"]
        })
    })
})

export const { useUpdateMyInfoMutation, useUpdatePasswordMutation } = myProdileApi
