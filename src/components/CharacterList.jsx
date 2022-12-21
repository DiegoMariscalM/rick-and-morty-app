import React from 'react'
import CharacterCard from './CharacterCard'

const CharacterList = ({location}) => {
    return (
        <section className='location-residents'>
        {
            location?.residents.map(urlResident => (
            <CharacterCard key={urlResident} urlResident={urlResident}/>
            ))
        } 
        </section>
    )
}

export default CharacterList