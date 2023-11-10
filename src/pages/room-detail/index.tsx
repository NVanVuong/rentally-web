import { roomDetail } from "@/mock/RoomDetail"
import Gallery from "./gallery"
import HostInformation from "./host"
import Contract from "./contract"
import RoomAction from "./action"
import Utilities from "./utilities"
import RatingDashboard, { AverageRating } from "./rating"
import { getAddress } from "@/utils/helpers"
import Map from "@/components/Map"
import Reviews from "./reviews"

const RoomDetail = () => {
    const { images, roomblock, landlord, price, utilities, ratingDetail } = roomDetail

    const coordinate = roomblock.coordinate

    return (
        <div className="h-full px-36 pb-20 pt-4">
            <address className="font-bold not-italic">{getAddress(roomblock)}</address>
            <div className="mt-2 flex justify-between">
                <AverageRating />
                <RoomAction />
            </div>
            <Gallery images={images} />
            <div className="mt-6 flex flex-row justify-between">
                <div className="flex flex-col gap-4">
                    <HostInformation landlord={landlord} />
                    <Utilities utilities={utilities} />
                    <RatingDashboard />
                </div>
                <Contract price={price} />
            </div>

            <div className="z-0 mt-6 pl-2">
                <h1 className="mb-4 text-lg font-bold">Where you will go</h1>
                <Map
                    markerText="This is where you will go"
                    zoom={16}
                    center={[coordinate.latitude, coordinate.longitude]}
                    height="480px"
                />
            </div>

            <Reviews reviews={ratingDetail.ratings} />
        </div>
    )
}

export default RoomDetail
