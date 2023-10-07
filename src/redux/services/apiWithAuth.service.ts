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
        // console.log(token)

        // if (token) {
        headers.set(
            "authorization",
            `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnb29nbGVJZCI6ImFjODg2YTdlLTM2MDAtNGEyYS04NjgwLTNlNTAzN2JlZDk0MCIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiQWRtaW4iLCJsYXN0TmFtZSI6IlJlbnRhbGx5IiwicGhvdG8iOiJodHRwczovL2Nsb3VkZmxhcmUtaXBmcy5jb20vaXBmcy9RbWQzVzVEdWhnSGlyTEhHVml4aTZWNzZMaENrWlV6NnBuRnQ1QUpCaXl2SHllL2F2YXRhci8xMjAuanBnIiwicm9sZSI6IkFETUlOIiwiaWQiOjEwLCJjcmVhdGVkX2F0IjoiMjAyMy0xMC0wN1QxOToxMzowNy4wMDBaIiwidXBkYXRlZF9hdCI6IjIwMjMtMTAtMDdUMTk6MTM6MDcuMDAwWiIsImlhdCI6MTY5NjczMzg5NCwiZXhwIjoxNjk3MzM4Njk0fQ.Gel9skGNSe_SgyNonEn-MfXcfH7OacQ06JsC1843rPk`
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
