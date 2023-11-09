import NavBar from "@/components/Navbar"
import CustomAutoComplete from "@/components/Autocomplete/CustomAutoComplete"
import { apiGetPublicDistricts, apiGetPublicProvinces } from "@/redux/services/help/help.service"
import { useEffect, useState } from "react"
import { IDistrict, IProvince } from "@/interfaces/location.interface"
const Header = () => {
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
    useEffect(()=>{
        const fetchPublicDistricts = async () => {
            try {
                if(province?.province_id){
                    const response = await apiGetPublicDistricts(province? province.province_id:'')
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
    },[province])

    return (
        <>
            <NavBar />
            

         <div className="flex justify-center " >
            <div className="flex flex-row mt-2 gap-1 w-[800px] h-16 rounded-full border-[#717171] border items-center">
                <div className="w-60 border-r focus:rounded-full focus:border pl-4 flex flex-col justify-center">
                    <label className="text-[16px] pl-4 font-bold">Province</label>
                    <CustomAutoComplete options={provinces} selectedOption={province} setSelectedOption={setProvince}  />
                </div>
                <div className="w-60 border-r focus:rounded-full focus:border pl-4 flex flex-col justify-center">
                    <label className="text-[16px] pl-4 font-bold">District</label>
                    <CustomAutoComplete options={districts} selectedOption={district} setSelectedOption={setDistrict}/>
                </div>
                 <div className="w-60 flex-1 focus:rounded-full focus:border pt-3 pb-1 px-4 flex flex-col justify-center">
                    <label htmlFor={'headerSearch'} className="text-[16px] pl-4 font-bold">Search</label>
                    <input type="text" id = "headerSearch" placeholder="Search" className="text-[13px] h-7 bg-white font-inherit placeholder:text-[13px] text-slate-800 placeholder:font-normal placeholder:text-secondaryBlack/80  focus:outline-none focus:ring-0"/>
                </div>
                <div onClick={()=>{}} className="h-12 w-12 cursor-pointer bg-primary rounded-full mr-2 flex items-center justify-center text-white hover:transition-all duration-100 hover:scale-110">
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
