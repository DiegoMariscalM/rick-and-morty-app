import React from 'react'

const LocationInfo = ({location}) => {
    return (
        <article className='info-container'>
            <ul className='location-info'>
                <li><span>Name: </span> {location?.name}</li>
                <li><span>Type: </span> {location?.type}</li>
                <li><span>Dimesion: </span> {location?.dimension}</li>
                <li><span>Population: </span>{location?.residents.length}</li>
            </ul>
        </article>
    )
}

export default LocationInfo