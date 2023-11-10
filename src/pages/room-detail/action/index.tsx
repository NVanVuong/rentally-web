import { AiOutlineHeart } from "react-icons/ai"
import { PiShareFat } from "react-icons/pi"
import Button from "../components/Button"

const RoomAction = () => {
    return (
        <div className="flex items-center gap-4">
            <Button className="hover:underline">
                <PiShareFat /> Share
            </Button>
            <Button className="hover:underline">
                <AiOutlineHeart /> Like
            </Button>
        </div>
    )
}
export default RoomAction
