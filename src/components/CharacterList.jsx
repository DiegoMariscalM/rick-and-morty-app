import React from 'react'
import CharacterCard from './CharacterCard'

const CharacterList = ({residentsFilter}) => {
    return (
        <section className='location-residents'>
        {
           residentsFilter?.map(urlResident => (
            <CharacterCard key={urlResident} urlResident={urlResident}/>
            ))
        } 
        </section>
    )
}

export default CharacterList