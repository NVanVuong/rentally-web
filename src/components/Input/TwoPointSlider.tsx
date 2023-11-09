import { IUtiltity } from "@/interfaces/utility.interface"
import { useGetUtilitiesQuery } from "@/redux/services/help/help.service"
import { Autocomplete, TextField } from "@mui/material"
import * as React from "react"
import { useState } from "react"
import { Range } from "react-range"
import ModalAntd from "@/components/Modal"

const TwoPointSlider = () => {
    const { data } = useGetUtilitiesQuery("")

    const [values, setValues] = React.useState([25, 75])

    const [selectedOptions, setSelectedOptions] = useState<IUtiltity[]>([])
    const handleChange = (_: any, value: any) => {
        setSelectedOptions(value)
    }

    return (
        <ModalAntd>
            <h2 className="w-full border-b pb-2 text-center text-[18px] font-bold">Filters</h2>
            <div className="mt-4">
                <label className="text-[24px] font-semibold">Utilities</label>
                <Autocomplete
                    onChange={handleChange}
                    multiple
                    id="tags-outlined"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            border: "px solid #d9d9d9",
                            lineHeight: "0px",
                            height: "120px",
                            width: "full",
                            fontSize: "12px",
                            zIndex: "10",
                            "&.Mui-focused fieldset": {
                                border: "0px solid #fff"
                            }
                        },
                        "& .MuiOutlinedInput-root ": {
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "0px solid #fff"
                            }
                        }
                    }}
                    options={data || []}
                    getOptionLabel={(option) => option.name}
                    value={selectedOptions}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            sx={{
                                "& .MuiButtonBase-root": {
                                    lineHeight: "20px",
                                    fontSize: "12px"
                                }
                            }}
                            label=""
                            placeholder="New util"
                        />
                    )}
                />
            </div>
            <div>
                <label className="text-[24px] font-semibold ">Price range</label>
                <div className="mt-8 px-4">
                    <Range
                        step={1}
                        min={0}
                        max={100}
                        values={values}
                        onChange={(values) => setValues(values)}
                        renderTrack={({ props, children }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: "2px",
                                    width: "100%",
                                    backgroundColor: "#000"
                                }}
                            >
                                {children}
                            </div>
                        )}
                        renderThumb={({ props, index }) => (
                            <div
                                className="h-8 w-8 rounded-full border bg-white shadow-lg  active:h-9 active:w-9 active:bg-slate-100 "
                                {...props}
                            />
                        )}
                    />
                    <div className="mb-3 mt-4 flex items-center gap-2">
                        {/* Giá trị: {values[0].toFixed(1)} - {values[1].toFixed(1)} */}
                        <div className="h-12 flex-1 rounded-lg border border-[#717171] px-2 ">
                            <label htmlFor="minPrice" className=" text-[#717171]">
                                Minimun
                            </label>
                            <input
                                id="minPrice"
                                className="h-5 w-4/5 font-semibold"
                                value={values[0].toFixed(1)}
                                placeholder=""
                            />
                        </div>
                        <p className="text-[40px] font-thin ">-</p>
                        <div className="h-12 flex-1 rounded-lg border border-[#717171] px-2 ">
                            <label htmlFor="maxPrice" className=" text-[#717171]">
                                Maximun
                            </label>
                            <input
                                id="maxPrice"
                                type="text"
                                className="h-5 w-4/5 font-semibold"
                                value={values[1].toFixed(1)}
                                placeholder=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex justify-between border-t pt-3">
                <button className="rounded-xl bg-white px-3 py-2 font-semibold text-black underline hover:bg-slate-200 ">
                    Clear All
                </button>
                <button className="rounded-xl bg-black px-6 py-3 font-semibold text-white ">Show places</button>
            </div>
        </ModalAntd>
    )
}

export default TwoPointSlider
