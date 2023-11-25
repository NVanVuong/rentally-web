import { useGetMyRentalQuery } from "@/redux/services/rentals/rentals.service"
import MyRentalCard from "./card"
import { IRentals } from "@/interfaces/rentals.interface"
import { Spin } from "antd"

const MyRental = () => {
    const { data, isLoading } = useGetMyRentalQuery()

    const myRentals = data?.data

    return (
        <div className="mb-8 mt-4 px-4 sm:px-2 md:px-10 xl:px-28">
            <h1 className="mb-4 text-2xl font-bold text-secondary">My Rental</h1>
            <Spin spinning={isLoading}>
                <div className="grid grid-cols-4 gap-x-12 gap-y-6">
                    {myRentals?.map((item: IRentals) => <MyRentalCard key={item.rentalInfo.id} myRental={item} />)}
                </div>
            </Spin>
        </div>
    )
}

export default MyRental
