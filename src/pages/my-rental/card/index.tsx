import { IRentals } from "@/interfaces/rentals.interface"
import { RENTAL_COLORS, STATUS_RENTAL } from "@/utils/constants/GlobalConst"
import { SITE_MAP } from "@/utils/constants/Path"
import { formatNumberWithCommas } from "@/utils/helpers"
import { useNavigate } from "react-router-dom"

interface IRentalCard {
    myRental: IRentals
}

const MyRentalCard = (props: IRentalCard) => {
    const myRental = props?.myRental

    const { rentalInfo, roomInfo, status } = myRental

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/${SITE_MAP.MY_RENTAL}/${1}`)
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-md">
            <img
                onClick={handleClick}
                src={roomInfo.images[0]}
                alt="Room image"
                className="h-36 w-full cursor-pointer object-fill"
            />
            <div className="px-4 py-2">
                <div className="flex items-center justify-between ">
                    <span className="text-sm font-medium uppercase text-secondary">{roomInfo.roomName}</span>

                    <span
                        className="cursor-pointer text-xs font-bold"
                        style={{ color: RENTAL_COLORS[status as STATUS_RENTAL] }}
                    >
                        <span className="text-base">•</span> {status}
                    </span>
                </div>
                <div className="mt-3 grid grid-cols-2 justify-between gap-y-2">
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-secondary">Move in date: </p>
                        <span className="text-sm">{rentalInfo.moveInDate}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-secondary">Monthly rent: </p>
                        <span className="text-sm">{formatNumberWithCommas(roomInfo.price)} VND</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-secondary">Lease term: </p>
                        <span className="text-sm">{rentalInfo.leaseTerm} months</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-secondary">Deposit amount: </p>
                        <span className="text-sm">{formatNumberWithCommas(rentalInfo.leaseTerminationCost)} VND</span>
                    </div>
                </div>
                <div className="mb-1 mt-4 flex justify-end">
                    <button className="ml-auto w-fit rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:shadow-md hover:shadow-primary">
                        Request break
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MyRentalCard
