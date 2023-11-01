import React, { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"

interface MapProps {
    center: [number, number]
    zoom?: number
    markerText?: string
}

const Map: React.FC<MapProps> = ({ center, zoom = 16, markerText }) => {
    const CenteredMap = () => {
        const map = useMap()
        map.invalidateSize()

        useEffect(() => {
            map.flyTo(center)
        }, [center, map])

        return null
    }

    return (
        <MapContainer center={center} zoom={zoom} style={{ width: "100%", height: "200px" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={center}>
                <Popup>{markerText}</Popup>
            </Marker>
            <CenteredMap />
        </MapContainer>
    )
}

export default Map
