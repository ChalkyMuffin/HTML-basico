'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import NavBar from '../Components/Navbar'
import { getCharacters } from 'rickmortyapi'

function CharacterProfilePage() {
  const idParams = useSearchParams()
  const characterId = idParams.get('id')
  const [character, setCharacter] = useState({
    id: 0,
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    origin: {
      name: '',
      url: '',
    },
    location: {
      name: '',
      url: '',
    },
    image: '',
    episode: [],
    url: '',
    created: '',
  })
  const [firstEpisode, setFirstEpisode] = useState('')

  const fetchCharacter = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${characterId}`,
      )
      if (!response.ok) {
        throw new Error('Failed to fetch character')
      }
      const data = await response.json()
      setCharacter(data)
    } catch (error) {
      console.error('Error fetching character:', error)
    }
  }

  const fetchFirstEpisode = async () => {
    try {
      const response = await fetch(`${character.episode[0]}`)
      if (!response.ok) {
        throw new Error('Failed to fetch first episode')
      }
      const data = await response.json()
      setFirstEpisode(data.name!)
    } catch (error) {
      console.error('Error fetching character:', error)
    }
  }
  useEffect(() => {
    if (characterId) {
      fetchCharacter()
    }
  }, [characterId, fetchCharacter])

  useEffect(() => {
    if (characterId) {
      fetchFirstEpisode()
    }
  }, [character, fetchFirstEpisode])

  return (
    <>
      <NavBar></NavBar>
      <div className='relative mx-auto mb-6 mt-16 w-full min-w-0 max-w-md break-words rounded-xl bg-amber-400 shadow-lg md:max-w-2xl'>
        <div className='px-6'>
          <div className='flex flex-wrap justify-center'>
            <div className='flex w-full justify-center'>
              <div className='relative'>
                <img
                  src={character.image}
                  className='absolute -m-16 -ml-20 max-w-[150px] border-none align-middle shadow-xl lg:-ml-16'
                />
              </div>
            </div>
            <div className='mt-20 w-full text-center'>
              <div className='flex justify-center pb-0 pt-8 lg:pt-4'>
                <div className='p-3 text-center'>
                  <span className='block text-xl font-bold uppercase tracking-wide text-slate-700'>
                    {character.episode.length}
                  </span>
                  <span className='text-white-400 text-sm'>Episodes</span>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-2 text-center'>
            <h3 className='mb-1 text-2xl font-bold leading-normal text-slate-700'>
              {character.name}
            </h3>
            <div className='text-white-400 mb-2 mt-0 text-xs font-bold uppercase'>
              <i className='fas fa-map-marker-alt mr-2 text-slate-400 opacity-75'></i>
              {character.location.name}
            </div>
          </div>
          <div className='mt-6 border-t border-slate-200 py-6 text-center'>
            <div className='flex flex-wrap justify-center'>
              <div className='w-full px-4'>
                <p className='mb-4 font-normal leading-relaxed text-slate-600'>
                  <strong>Status: </strong> {character.status}
                </p>
                <p className='mb-4 font-normal leading-relaxed text-slate-600'>
                  <strong>Species: </strong> {character.species}
                </p>
                <p className='mb-4 font-normal leading-relaxed text-slate-600'>
                  <strong>Type: </strong> {character.type}
                </p>
                <p className='mb-4 font-normal leading-relaxed text-slate-600'>
                  <strong>Gender: </strong> {character.gender}
                </p>
                <p className='mb-4 font-normal leading-relaxed text-slate-600'>
                  <strong>First episode: </strong> {firstEpisode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CharacterProfilePage
