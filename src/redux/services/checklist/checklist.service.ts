import { IChecklistCreateResponse, IChecklistRequest } from "@/interfaces/checklist.interface"
import { createApiWithAuth } from "../apiWithAuth.service"
import { IRoomFinding } from "@/interfaces/roomfiding.interface"

const createApiGetCheckListWithAuth = createApiWithAuth("getChecklistApi", ["Checklists"])

export const getChecklistApi = createApiGetCheckListWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getChecklist: builder.query<{ message: string; status: number; data?: IRoomFinding[] }, any>({
            query: (params) => {
                return {
                    url: "/checklist",
                    params: params
                }
            },
            providesTags: ["Checklists"]
        }),
        createChecklist: builder.mutation<IChecklistCreateResponse, { data: IChecklistRequest }>({
            query: ({ data }) => ({
                url: `/checklist`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Checklists"]
        })
    })
})

export const { useGetChecklistQuery, useCreateChecklistMutation } = getChecklistApi
