import { setPlaceInfo } from "@/redux/features/search-map/search-map.slice"

export const createUserFormData = (values: any) => {
    const formData = new FormData()
    formData.append("email", values.email)
    formData.append("password", values.password)
    formData.append("firstName", values.firstName)
    formData.append("lastName", values.lastName)
    formData.append("phoneNumber", values.phoneNumber)
    formData.append("role", values.role)
    if (values.photo) formData.append("photo", values.photo[0].originFileObj)

    return formData
}

export const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e
    }
    return e?.fileList
}

export function formatStatus(status?: string): string {
    if (!status) return ""
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
}

export function getCurrentLocation(dispatch: any) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                const currentLocation = {
                    latlng: {
                        lat: latitude,
                        lng: longitude
                    }
                }
                dispatch(setPlaceInfo(currentLocation))
            },
            (error) => {
                console.error("Error getting user location:", error)
            }
        )
    } else {
        console.error("Geolocation is not available in this browser.")
    }
}

export const getAddress = (roomblock: any) => {
    return roomblock.address + " | " + roomblock.district + ", " + roomblock.city
}

export function convertDateDeleteAt(deletedAt: any) {
    if (!deletedAt) return "-----"

    const originalDate = new Date(deletedAt)

    const year = originalDate.getFullYear()
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0")
    const day = originalDate.getDate().toString().padStart(2, "0")

    const formattedDateString = [year, month, day].join("-")

    return formattedDateString
}

export const formatNumberWithCommas = (number: any) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const styleOrEmpty = (condition: boolean, style: string) => (condition ? style : "")
