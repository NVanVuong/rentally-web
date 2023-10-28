// interface Props {
import { IRoom } from "@/interfaces/room.interface"
import { IUtiltity } from "@/interfaces/utility.interface"
import { changeRoomName, changeUtilitiesRoom } from "@/redux/features/generateRoom/generateRoom.slice"
import { useAppDispatch } from "@/redux/hook"
import { useGetUtilitiesQuery } from "@/redux/services/help/help.service"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import { AiOutlineHome } from "react-icons/ai"

interface Props {
    room: IRoom
}
const RoomCard = ({ room }: Props) => {
    const dispatch = useAppDispatch()
    const { area, price, depositAmount, utilities, id } = room
    const [roomName, setRoomName] = useState(room.roomName)
    const { data } = useGetUtilitiesQuery("")

    const [selectedOptions, setSelectedOptions] = useState([])
    let srcImg = ""
    if (room.images) {
        srcImg = JSON.parse(room?.images[0]).thumbUrl
    }

    const handleChange = (event:any, value: any) => {
        setSelectedOptions(value)
        dispatch(changeUtilitiesRoom({ id: `${id}`, utilities: value }))
    }
    return (
        <div className="flex h-[320px] w-[240px] flex-col rounded-[16px] shadow-lg">
            <img className="h-[140px] rounded-t-[16px] " src={srcImg} alt="" />
            <div className="flex w-full flex-col px-4 py-2">
                <div className="flex gap-1 border-b px-2 ">
                    <AiOutlineHome className="h-4 w-4 text-primary" />
                    <input
                        type="text"
                        value={roomName}
                        onChange={(e) => {
                            setRoomName(e.target.value)

                            dispatch(changeRoomName({ id: id||'', roomName: e.target.value }))
                        }}
                        placeholder="Room ID"
                        className="h-full w-[100px] text-[14px] outline-none  placeholder:text-[14px] placeholder:font-normal "
                    />
                </div>
                <div className="border-b">
                    <h5 className="text-[16px] font-bold text-[#128E07]">Vacant</h5>
                    <p>{`Price: ${price} dollar`}</p>
                    <p>{`Area: ${area} m2`}</p>
                    <p>{`Deposit amount: ${depositAmount} dollar`}</p>
                </div>
                <div className="">
                    <Autocomplete
                        onChange={handleChange}
                        multiple
                        id="tags-outlined"
                        options={data?.data.utilities||[]}
                        getOptionLabel={(option) => option.name}
                        defaultValue={utilities.map((value:IUtiltity, index: number) => data?.data.utilities.find((utility) => utility.id=== value.id))}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard" // Thêm dòng này
                                label=""
                                placeholder="New util"
                                InputProps={{ ...params.InputProps, style: { borderBottom: "none" } }} // Thêm dòng này
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default RoomCard
