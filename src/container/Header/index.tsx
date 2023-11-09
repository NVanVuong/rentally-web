import NavBar from "@/components/Navbar"
import CustomAutoComplete from "@/components/Autocomplete/CustomAutoComplete"
import { apiGetPublicDistricts, apiGetPublicProvinces } from "@/redux/services/help/help.service"
import { useEffect, useState } from "react"
import { IDistrict, IProvince } from "@/interfaces/location.interface"
import TwoPointSlider from "@/components/Input/TwoPointSlider"
import { useAppDispatch } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"
const Header = () => {
    const dispacth = useAppDispatch()

    const [provinces, setProvinces] = useState<IProvince[]>([])
    const [districts, setDistricts] = useState<IDistrict[]>([])
    const [province, setProvince] = useState<IProvince | null>(null)
    const [district, setDistrict] = useState<IDistrict | null>(null)

    useEffect(() => {
        const fetchPublicProvince = async () => {
            try {
                const response = await apiGetPublicProvinces()
                if (response) {
                    setProvinces(response)
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchPublicProvince()
    }, [])
    useEffect(() => {
        const fetchPublicDistricts = async () => {
            try {
                if (province?.province_id) {
                    const response = await apiGetPublicDistricts(province ? province.province_id : "")
                    if (response) {
                        setDistricts(response)
                        setDistrict(null)
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchPublicDistricts()
    }, [province])

    return (
        <>
            <NavBar />
            <div className="ml-40 w-80">
                <button className="bg-blue-300 active:bg-blue-500" onClick={() => dispacth(openModal({}))}>Clicl</button>

                <TwoPointSlider />
            </div>

            <div className="flex justify-center ">
                <div className="mt-2 flex h-16 w-[800px] flex-row items-center gap-1 rounded-full border border-[#717171]">
                    <div className="flex w-60 flex-col justify-center border-r pl-4 focus:rounded-full focus:border">
                        <label className="pl-4 text-[16px] font-bold">Province</label>
                        <CustomAutoComplete
                            options={provinces}
                            selectedOption={province}
                            setSelectedOption={setProvince}
                        />
                    </div>
                    <div className="flex w-60 flex-col justify-center border-r pl-4 focus:rounded-full focus:border">
                        <label className="pl-4 text-[16px] font-bold">District</label>
                        <CustomAutoComplete
                            options={districts}
                            selectedOption={district}
                            setSelectedOption={setDistrict}
                        />
                    </div>
                    <div className="flex w-60 flex-1 flex-col justify-center px-4 pb-1 pt-3 focus:rounded-full focus:border">
                        <label htmlFor={"headerSearch"} className="pl-4 text-[16px] font-bold">
                            Search
                        </label>
                        <input
                            type="text"
                            id="headerSearch"
                            placeholder="Search"
                            className="h-7 bg-white font-inherit text-[13px] text-slate-800 placeholder:text-[13px] placeholder:font-normal placeholder:text-secondaryBlack/80  focus:outline-none focus:ring-0"
                        />
                    </div>
                    <div
                        onClick={() => {}}
                        className="mr-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary text-white duration-100 hover:scale-110 transition-all"
                    >
                        <svg
                            className="h-4 w-4 transition-all duration-100 hover:scale-110"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
