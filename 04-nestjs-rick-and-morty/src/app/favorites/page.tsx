'use client'
import { useEffect, useState } from 'react'
import CharacterCard from '../Components/CharacterCard'
import NavBar from '../Components/Navbar'

type character = {
  id: number
  name: string
  status: string
  species: string
  image: string
}

export default function Favorites() {
  const [characters, setCharacters] = useState<character[]>([])
  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const favoritesFromStorage = localStorage.getItem('favorites')
      const favoritesArray = JSON.parse(favoritesFromStorage!)
      const response = await fetch('https://rickandmortyapi.com/api/character')
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()

      let favoriteCharacters = data.results
      favoriteCharacters = favoriteCharacters.filter((character: character) =>
        favoritesArray.includes(character.id),
      )
      setCharacters(favoriteCharacters)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <NavBar></NavBar>
      <div className='m-8'>
        <div className='grid grid-cols-1 place-items-center gap-7 md:grid-cols-3'>
          {characters.map((character, index) => (
            <CharacterCard
              key={index}
              id={character.id}
              image={character.image}
              name={character.name}
              status={character.status}
              species={character.species}
            />
          ))}
        </div>
      </div>
    </>
  )
}
