import { IRentals } from "./rentals.interface"

export interface IPayments {
    id: number
    rental: IRentals
    totalPrice: string
    electricNumber: number
    totalElectricPrice: string
    waterNumber: number
    totalWaterPrice: string
    additionalPrice: string
    month: number
    year: number
    status: string
    paidAt?: string
    expirationDate: string
}

export interface IPaymentsResponse {
    data: IPayments[]
    message: string
    status: string
}

export interface IPaymentResponse {
    data: IPayments
    message: string
    status: string
}
