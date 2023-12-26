export interface IStatisticRevenue {
    revenue: number
    electric: number
    water: number
    additionalPrice: number
    month: number
}

export interface IStatisticRevenueResponse {
    message: string
    status: string
    data: {
        statistics: IStatisticRevenue[]
        totalRevenue: number
    }
}
