import React, { useState } from 'react'
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

const Map = ({lat,long}) => {
    const position = [lat, long]
    // const [position,setPosition] = useState()
    // setPosition([lat,long])
    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: 'inherit', borderRadius : '8px' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                
            </Marker>
        </MapContainer>
    )
}

export default Map