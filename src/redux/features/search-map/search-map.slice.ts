import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    placeInfo: {
        address: "",
        city: "",
        district: "",
        country: "",
        latlng: {
            lat: 16.07408355193989,
            lng: 108.14989962882427
        }
    }
}

const searchMapSlice = createSlice({
    name: "search-map",
    initialState,
    reducers: {
        setPlaceInfo: (state, action) => {
            const { name, address, city, country, latlng } = action.payload
            state.placeInfo = {
                address: name ? name : address,
                district: city,
                city,
                country,
                latlng
            }
        },
        resetPlaceInfo: (state) => {
            state.placeInfo = initialState.placeInfo
        }
    }
})

export const { setPlaceInfo, resetPlaceInfo } = searchMapSlice.actions

export default searchMapSlice.reducer
