import { IPaymentResponse, IPaymentsResponse } from "@/interfaces/payments.interface"
import { createApiWithAuth } from "../apiWithAuth.service"
import { convertDate } from "@/utils/helpers"

const createApiPaymentskWithAuth = createApiWithAuth("paymentsApi", ["Payments"])
export const paymentsApi = createApiPaymentskWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getMyPayments: builder.query<IPaymentsResponse, void>({
            query: () => `/payments/my-payment`,
            providesTags: ["Payments"],
            transformResponse(baseQueryReturnValue: IPaymentsResponse) {
                return {
                    data: baseQueryReturnValue.data.map((payment) => ({
                        ...payment,
                        paidAt: convertDate(payment.paidAt),
                        expirationDate: convertDate(payment.expirationDate)
                    })),
                    message: baseQueryReturnValue.message,
                    status: baseQueryReturnValue.status
                }
            }
        }),
        getMyPayment: builder.query<IPaymentResponse, { id: number }>({
            query: ({ id }) => `/payments/${id}`,
            providesTags: ["Payments"],
            transformResponse(baseQueryReturnValue: IPaymentResponse) {
                return {
                    data: {
                        ...baseQueryReturnValue.data,
                        paidAt: convertDate(baseQueryReturnValue.data.paidAt),
                        expirationDate: convertDate(baseQueryReturnValue.data.expirationDate)
                    },
                    message: baseQueryReturnValue.message,
                    status: baseQueryReturnValue.status
                }
            }
        }),
        checkoutPayment: builder.mutation<IPaymentResponse, { id: number }>({
            query: ({ id }) => ({
                url: `/stripe/check-out/${id}`,
                method: "POST"
            }),
            invalidatesTags: ["Payments"]
        })
    })
})

export const { useGetMyPaymentsQuery, useGetMyPaymentQuery, useCheckoutPaymentMutation } = paymentsApi
