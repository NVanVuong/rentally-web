import { roomDetail } from "@/mock/RoomDetail"
import { AiFillStar, AiOutlineHeart } from "react-icons/ai"
import { PiShareFat } from "react-icons/pi"
import Button from "./components/Button"
import Gallery from "./gallery"

const RoomDetail = () => {
    const { price, images, utilities, roomblock, avgRate, ratings } = roomDetail

    const address = roomblock.address + " | " + roomblock.district + ", " + roomblock.city

    return (
        <div className="mt-16 px-28 pt-4">
            <address className="font-bold not-italic">{address}</address>
            <div className="mt-2 flex justify-between">
                <div className=" flex items-center gap-2">
                    <span className="flex items-center gap-1">
                        <AiFillStar /> {avgRate}
                    </span>
                    <span className="text-xs">•</span>
                    <span>{ratings.length} reviews</span>
                </div>
                <div className="flex items-center gap-4">
                    <Button className="hover:underline">
                        <PiShareFat /> Share
                    </Button>
                    <Button className="hover:underline">
                        <AiOutlineHeart /> Like
                    </Button>
                </div>
            </div>
            <Gallery images={images} />
        </div>
    )
}

export default RoomDetail
