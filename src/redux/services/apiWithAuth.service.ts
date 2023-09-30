import { logOut, setCredentials } from "../features/auth/auth.slice"
import type { RootState } from "@/redux/store"
import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "@/utils/constants/GlobalConst"

type BaseQueryWithReauthArgs = Parameters<BaseQueryFn>

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    // credentials: 'include',
    mode: "cors",
    prepareHeaders: (headers, { getState }) => {
        headers.set("Access-Control-Allow-Origin", "*")
        // const token = (getState() as RootState).auth.accessToken
        // if (token) {
        headers.set(
            "authorization",
            `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnb29nbGVJZCI6bnVsbCwiZW1haWwiOiJ0aGluaG1uc2QyMDAyQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IlRoaW5oIiwibGFzdE5hbWUiOiJMZSBWYW4iLCJwaG90byI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS81NjgyMzUwNiIsInJvbGUiOiJBRE1JTiIsImlkIjo5NSwiY3JlYXRlZF9hdCI6IjIwMjMtMDktMjZUMTQ6Mjk6MTQuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIzLTA5LTI2VDE0OjI5OjE0LjAwMFoiLCJpYXQiOjE2OTU5MDQzMTksImV4cCI6MTY5NjUwOTExOX0.CkxUoYGFU3xO80HiAPc9paczx9mpMRPwpEgYnt0QmOk`
        )
        // }
        return headers
    }
})

const baseQueryWithReAuth = async (
    args: BaseQueryWithReauthArgs[0],
    api: BaseQueryWithReauthArgs[1],
    extraOptions: BaseQueryWithReauthArgs[2]
) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 403) {
        console.log("sending refresh token")
        // send refresh token to get a new access token
        const refreshResult = await baseQuery("/refresh", api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            const accessToken = (api.getState() as RootState).auth.accessToken
            // store the new token
            api.dispatch(
                setCredentials({
                    ...refreshResult.data,
                    accessToken
                })
            )
            // retry the original query with the new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const creatApiWithAuth = (reducerPath: string, tagTypes: Array<string>) =>
    createApi({
        baseQuery: baseQueryWithReAuth,
        endpoints: () => ({}),
        reducerPath: reducerPath,
        tagTypes: tagTypes
    })
