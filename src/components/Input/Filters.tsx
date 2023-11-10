import { IUtiltity } from "@/interfaces/utility.interface"
import { useGetUtilitiesQuery } from "@/redux/services/help/help.service"
import { Autocomplete, TextField } from "@mui/material"
import * as React from "react"
import { useEffect, useState } from "react"
import { Range } from "react-range"
import ModalAntd from "@/components/Modal"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"
import { useAppDispatch } from "@/redux/hook"
import { closeModal } from "@/redux/features/modal/modal.slice"

const Filters = () => {
    const [searchParams] = useSearchParams()

    const navigate = useNavigate()
    const dispacth = useAppDispatch()

    const { data } = useGetUtilitiesQuery("")

    const [values, setValues] = React.useState([parseInt(searchParams.get('minPrice') || '0', 10),parseInt(searchParams.get('maxPrice') || '100', 10)])
    console.log(data)
    const [selectedOptions, setSelectedOptions] = useState<IUtiltity[]>(
        searchParams.getAll("utility")
          ? searchParams
              .getAll("utility")
              .map((value: string) => (data ? data.find((utility) => String(utility.id) === value) : undefined))
              .filter((option) => option !== undefined) as IUtiltity[]
          : []
      )
      
      
    console.log(selectedOptions)
    const [searchParamsObject, setSearchParamsObject] = useState<Record<string, string[]>>({})

    useEffect(() => {
        const params: [string, string][] = []
        for (const entry of searchParams.entries()) {
            params.push(entry as [string, string])
        }

        const newSearchParamsObject: Record<string, string[]> = {}

        params?.forEach((i) => {
            if (Object.keys(newSearchParamsObject).some((item) => item === i[0])) {
                newSearchParamsObject[i[0]] = [...newSearchParamsObject[i[0]], i[1]]
            } else {
                newSearchParamsObject[i[0]] = [i[1]]
            }
        })

        setSearchParamsObject(newSearchParamsObject)
        console.log(newSearchParamsObject)
    }, [searchParams])

    const handleChange = (_: any, value: any) => {
        setSelectedOptions(value)
    }

    const handleFilters = () => {
        const queryCodesObj = new URLSearchParams()

        // Function to append key-value pairs to the URLSearchParams object
        const appendKeyValuePair = (key: string, value: string | string[]) => {
            if (key !== "utility") queryCodesObj.set(key, String(value))
        }

        // Append each key-value pair from searchParamsObject
        Object.entries(searchParamsObject).forEach(([key, values]) => {
            values.forEach((value) => {
                appendKeyValuePair(key, value)
            })
        })

        appendKeyValuePair("minPrice", String(values[0]))
        appendKeyValuePair("maxPrice", String(values[1]))
        selectedOptions.forEach((option) => queryCodesObj.append("utility", option.id))

        navigate({
            pathname: "/",
            search: createSearchParams(queryCodesObj).toString()
        })
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
                        renderThumb={({ props }) => (
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
                <button
                    onClick={() => {
                        setValues([0, 100])
                        setSelectedOptions([])
                    }}
                    className="rounded-xl bg-white px-3 py-2 font-semibold text-black underline hover:bg-slate-200 "
                >
                    Clear All
                </button>
                <button
                    onClick={() => {
                        dispacth(closeModal())
                        handleFilters()
                    }}
                    className="rounded-xl bg-black px-6 py-3 font-semibold text-white "
                >
                    Show places
                </button>
            </div>
        </ModalAntd>
    )
}

export default Filters
