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

    console.log(province)
    return (
        <>
            <NavBar />
            <CustomAutoComplete options={provinces} selectedOption={province} setSelectedOption={setProvince} />
            <CustomAutoComplete options={districts} selectedOption={district} setSelectedOption={setDistrict} />
        </>
    )
}

export default Header
