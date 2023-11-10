import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "./index.css"
import ListingCard from "../Card/ListingCard"
import L from "leaflet"

interface MapProps {
    center: [number, number]
    locations: [number, number][]
    zoom?: number
    markerText?: string
}

const HomeMap: React.FC<MapProps> = ({ locations, zoom = 15 }) => {
    const [center, setCenter] = useState(locations[0])

    function MyMap() {
        const map = useMap()

        React.useEffect(() => {
            const group = new L.FeatureGroup<any>(locations.map((location) => L.marker(location)))
            map.fitBounds(group.getBounds().pad(0.5))
        }, [])

        return null
    }
    const CenteredMap = () => {
        const map = useMap()
        map.invalidateSize()

        useEffect(() => {
            map.flyTo(center)
        }, [center, map])

        return null
    }
    const customDivIcon = (text: string, isClick: boolean) =>
        L.divIcon({
            className: `custom-div-icon${isClick ? "-white" : ""}`,
            html: `<div>${text}<div>`
        })

    return (
        <MapContainer center={locations[3]} zoom={zoom} style={{ width: "100%", height: "100%", zIndex: 0 }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MyMap />
            {locations.map((location) => {
                return (
                    <Marker
                        position={location}
                        icon={customDivIcon("$200", true)}
                        eventHandlers={{
                            click: () => {
                                setCenter(location)
                            }
                        }}
                    >
                        <Popup>
                            <ListingCard />
                        </Popup>
                    </Marker>
                )
            })}
            <CenteredMap />
        </MapContainer>
    )
}

export default HomeMap
