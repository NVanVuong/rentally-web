import { IStatisticRevenueResponse } from "@/interfaces/statistics.interface"
import { createApiWithAuth } from "../apiWithAuth.service"

const createApiStatistics = createApiWithAuth("statistics", ["statistics"])

export const statisticsApi = createApiStatistics.injectEndpoints({
    endpoints: (builder) => ({
        getStatisticRevenue: builder.query<IStatisticRevenueResponse, { year: number }>({
            query: ({ year }) => {
                return {
                    url: `/statistic/revenue/${year}`
                }
            }
        })
    })
})

export const { useGetStatisticRevenueQuery } = statisticsApi
