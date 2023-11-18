import { IChecklist } from "@/interfaces/checklist.interface"
import { createApiWithAuth } from "../apiWithAuth.service"

const createApiGetCheckListWithAuth = createApiWithAuth("getChecklistApi", ["getChecklist"])

export const getChecklistApi = createApiGetCheckListWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getChecklist: builder.query<{ message: string; status: number; data?: IChecklist[] }, any>({
            query: (params) => {
                return {
                    url: "/checklist",
                    params: params
                }
            }
        })
    })
})

export const { useGetChecklistQuery } = getChecklistApi
