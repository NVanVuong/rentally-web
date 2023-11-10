import { roomDetail } from "@/mock/RoomDetail"
import { AiFillStar } from "react-icons/ai"
import { MdOutlineCleanHands, MdSecurity } from "react-icons/md"
import { GrLocation } from "react-icons/gr"
import { BiSupport } from "react-icons/bi"

type TSize = "big" | "small"

interface IRating {
    size?: TSize
}

const AverageRating = ({ size = "small" }: IRating) => {
    const { ratingDetail } = roomDetail

    return (
        <div className={`${size === "big" ? "text-lg font-bold" : ""} flex items-center gap-2`}>
            <span className="flex items-center gap-1">
                <AiFillStar /> {ratingDetail.avgRate}
            </span>
            <span className="text-xs">•</span>
            <span>{ratingDetail.ratings.length} reviews</span>
        </div>
    )
}

export { AverageRating }

const RatingDashboard = () => {
    const { ratingDetail } = roomDetail

    const { avgClean, avgLocation, avgSecurity, avgSupport } = ratingDetail

    const averageRating = [
        {
            title: "Cleanliness",
            value: avgClean,
            icon: <MdOutlineCleanHands className="h-6 w-6" />
        },
        {
            title: "Location",
            value: avgLocation,
            icon: <GrLocation className="h-6 w-6" />
        },
        {
            title: "Security",
            value: avgSecurity,
            icon: <MdSecurity className="h-6 w-6" />
        },
        {
            title: "Support",
            value: avgSupport,
            icon: <BiSupport className="h-6 w-6" />
        }
    ]

    return (
        <div className="flex flex-col border-b pb-4 pl-2">
            <AverageRating size="big" />
            <div className="flex">
                {averageRating.map((rating) => (
                    <div key={rating.title} className="mr-6 mt-2 flex w-32 flex-col border-r last:border-none">
                        <span className="text-sm font-medium text-gray-600">{rating.title}</span>
                        <span className="mt-1 text-lg font-bold">{rating.value}</span>
                        <span className="mt-4">{rating.icon}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RatingDashboard
