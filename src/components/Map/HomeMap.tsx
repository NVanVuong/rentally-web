import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "./index.css"
import ListingCard from "../Card/ListingCard"
import L from "leaflet"
import { IRoomFinding } from "@/interfaces/roomfiding.interface"

interface MapProps {
    dataRooms: IRoomFinding[]
    zoom?: number
    markerText?: string
}

const HomeMap: React.FC<MapProps> = ({ zoom = 20, dataRooms }) => {
    const [center, setCenter] = useState([dataRooms[0].coordinate.latitude, dataRooms[0].coordinate.longitude])
    function MyMap() {
        const map = useMap()

        React.useEffect(() => {
            const group = new L.FeatureGroup<any>(
                dataRooms.map((dataRoom) => {
                    const { latitude, longitude } = dataRoom.coordinate

                    return L.marker([latitude, longitude])
                })
            )
            map.fitBounds(group.getBounds().pad(0.5))
            // eslint-disable-next-line
        }, [])

        return null
    }
    const CenteredMap = () => {
        const map = useMap()
        map.invalidateSize()

        useEffect(() => {
            map.flyTo(new L.LatLng(center[0], center[1]), map.getZoom())
            // eslint-disable-next-line
        }, [center, map])

        return null
    }
    const customDivIcon = (text: string, isClick: boolean) =>
        L.divIcon({
            className: `custom-div-icon${isClick ? "-white" : ""}`,
            html: `<div>${text}<div>`
        })

    return (
        <div className="absolute inset-0 h-screen">
            <MapContainer zoom={zoom} style={{ width: "100%", height: "100%", zIndex: 0 }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MyMap />
                {dataRooms.map((dataRoom) => {
                    return (
                        <Marker
                            position={[dataRoom.coordinate.latitude, dataRoom.coordinate.longitude]}
                            icon={customDivIcon(`${(Number(dataRoom.price) / 1000000).toFixed(1)}` + "m", true)}
                            eventHandlers={{
                                click: () => {
                                    setCenter([dataRoom.coordinate.latitude, dataRoom.coordinate.longitude])
                                }
                            }}
                        >
                            <Popup>
                                <ListingCard dataRoom={dataRoom} />
                            </Popup>
                        </Marker>
                    )
                })}
                <CenteredMap />
            </MapContainer>
        </div>
    )
}

export default HomeMap
