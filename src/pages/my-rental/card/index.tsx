import { IRentals } from "@/interfaces/rentals.interface"
import { RENTAL_COLORS, STATUS_RENTAL, STATUS_RENTAL_TEXT } from "@/utils/constants/GlobalConst"
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
        navigate(`/${SITE_MAP.MY_RENTAL}/${rentalInfo.id}`)
    }

    const getActionRental = () => {
        switch (status) {
            case STATUS_RENTAL.CREATED:
                return <span className="py-1.5 text-sm text-gray-400">Waiting host for approval</span>
            case STATUS_RENTAL.APPROVED:
                return (
                    <button className="ml-auto w-fit rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:shadow-md hover:shadow-primary">
                        Confirm
                    </button>
                )
            case STATUS_RENTAL.COMPLETED:
                return (
                    <button className="ml-auto w-fit rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:shadow-md hover:shadow-primary">
                        Request break
                    </button>
                )
            case STATUS_RENTAL.REQUEST_BREAK:
                return <span className="py-1.5 text-sm text-gray-400">Waiting host for accepting break</span>
            case STATUS_RENTAL.CANCELED:
                return <span className="py-1.5 text-sm text-gray-400">Booking canceled</span>
            case STATUS_RENTAL.BROKEN:
                return <span className="py-1.5 text-sm text-gray-400">Your reservation has broken</span>
            case STATUS_RENTAL.ENDED:
                return <span className="py-1.5 text-sm text-gray-400">Your reservation has ended</span>
            default:
                return null
        }
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
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium uppercase text-secondary">{roomInfo.roomName}</span>

                    <span
                        className="break-keep text-xs font-bold uppercase"
                        style={{ color: RENTAL_COLORS[status as STATUS_RENTAL] }}
                    >
                        {STATUS_RENTAL_TEXT[status as STATUS_RENTAL]}
                    </span>
                </div>
                <div className="my-4 grid grid-cols-2 justify-between gap-y-2">
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
                <hr className="border border-b-gray-50" />
                <div onClick={handleClick} className="mb-1 mt-2 flex h-full cursor-pointer items-center justify-end">
                    {getActionRental()}
                </div>
            </div>
        </div>
    )
}

export default MyRentalCard