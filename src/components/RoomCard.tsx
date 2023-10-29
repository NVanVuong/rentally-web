// interface Props {
import { IRoom } from "@/interfaces/room.interface"
import { IUtiltity } from "@/interfaces/utility.interface"
import { changeRoomName, changeUtilitiesRoom, deleteRoom } from "@/redux/features/generateRoom/generateRoom.slice"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
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
    const srcImage = JSON.parse(useAppSelector((state) => state.generateRoom.srcImage))
    const [roomName, setRoomName] = useState(room.roomName)
    const { data } = useGetUtilitiesQuery("")
    const [selectedOptions, setSelectedOptions] = useState<IUtiltity[]>([])

    const handleChange = (event: any, value: IUtiltity[]) => {
        setSelectedOptions(value)
        dispatch(changeUtilitiesRoom({ id: `${id}`, utilities: value.map((selectedOption) => selectedOption.id) }))
    }

    return (
        <div className="flex h-[320px] w-[240px] flex-col rounded-[16px] shadow-lg">
            <p
                onClick={() => {
                    dispatch(deleteRoom({ id: id || "" }))
                }}
            >
                delete
            </p>
            <img className="h-[140px] rounded-t-[16px] object-cover" src={srcImage || ""} alt="" />
            <div className="flex w-full flex-col px-4 py-2">
                <div className="flex gap-1 border-b px-2 ">
                    <AiOutlineHome className="h-4 w-4 text-primary" />
                    <input
                        type="text"
                        value={roomName}
                        onChange={(e) => {
                            setRoomName(e.target.value)

                            dispatch(changeRoomName({ id: id || "", roomName: e.target.value }))
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
                <div className="h-4">
                    <Autocomplete
                        onChange={handleChange}
                        multiple
                        id="tags-outlined"
                        sx={{
                            // border: "1px solid blue",
                            "& .MuiOutlinedInput-root": {
                                border: "0px solid #fff",
                                borderRadius: "20px",
                                padding: "0"
                            },
                            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                border: "none"
                            },
                            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                border: "0px solid #fff"
                            }
                        }}
                        options={data || []}
                        getOptionLabel={(option) => option.name}
                        defaultValue={utilities.map((value: string) => data?.find((utility) => utility.id === value))}
                        filterSelectedOptions
                        renderInput={(params) => <TextField {...params} label="" placeholder="New util" />}
                    />
                </div>
            </div>
        </div>
    )
}

export default RoomCard
