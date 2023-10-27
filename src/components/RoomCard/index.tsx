// interface Props {
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import { AiOutlineHome } from "react-icons/ai"

const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 }
    //...
]

const RoomCard = () => {
    const [selectedOptions, setSelectedOptions] = useState([])

    const handleChange = (event, value: any) => {
        setSelectedOptions(value)
    }
    return (
        <div className="flex h-[320px] w-[240px] flex-col rounded-[16px] shadow-lg">
            <img
                className="h-[90] w-full rounded-t-[16px] "
                src="https://i.ytimg.com/vi/LeKCYjON8iQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB4gMZGZwzjhIdTJLDy0752bdtYIA"
                alt=""
            />
            <div className="flex w-full flex-col px-4 py-2">
                <div className="flex gap-1 border-b px-2 ">
                    <AiOutlineHome className="h-4 w-4 text-primary" />
                    <input
                        type="text"
                        placeholder="Room ID"
                        className="h-full w-[100px] text-[14px] outline-none  placeholder:text-[14px] placeholder:font-normal "
                    />
                </div>
                <div className="border-b">
                    <h5 className="text-[16px] font-bold text-[#128E07]">Vacant</h5>
                    <div className="flex gap-4">
                        <p>price: 400dollar</p>
                    <p>Area: 20 m</p>
                    </div>
                        <p>Deposit Amount: 20dollar</p>
                </div>
                <div className="">
                    <Autocomplete
                        onChange={handleChange}
                        multiple
                        id="tags-outlined"
                        options={top100Films}
                        
                        getOptionLabel={(option) => option.title}
                        filterSelectedOptions
                        renderInput={(params) =>    <TextField 
                            {...params} 
                            variant="standard" // Thêm dòng này
                            label="" 
                            placeholder="New util"
                            InputProps={{ ...params.InputProps, style: { borderBottom: 'none' } }} // Thêm dòng này
                          />}
                    />
                </div>
            </div>
        </div>
    )
}

export default RoomCard
