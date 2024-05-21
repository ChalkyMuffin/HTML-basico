'use client'
import { useEffect, useState } from 'react'

interface Props {
  id: number
  name: string
  status: string
  species: string
  image: string
}

const CharacterCard: React.FC<Props> = ({
  id,
  image,
  name,
  status,
  species,
}) => {
  const [favorite, setFavorite] = useState<boolean>(false)

  useEffect(() => {
    const favoritesFromStorage = localStorage.getItem('favorites')
    if (favoritesFromStorage) {
      const favoritesArray = JSON.parse(favoritesFromStorage)
      setFavorite(favoritesArray.includes(id))
    }
  }, [id])

  const toggleFavorite = () => {
    setFavorite(!favorite)

    let favoritesArray: number[] = []
    const favoritesFromStorage = localStorage.getItem('favorites')
    if (favoritesFromStorage) {
      favoritesArray = JSON.parse(favoritesFromStorage)
    }
    if (favorite) {
      favoritesArray = favoritesArray.filter((favId: number) => favId !== id)
    } else {
      favoritesArray.push(id)
    }

    localStorage.setItem('favorites', JSON.stringify(favoritesArray))
  }

  return (
    <div className='max-w-sm rounded-lg border border-gray-200 bg-yellow-500 shadow dark:border-gray-700 dark:bg-amber-400'>
      <a href='/'>
        <img className='w-full rounded-t-lg' src={image} alt='' />
      </a>
      <div className='p-5'>
        <a href={`/profile?id=${id}`}>
          <h5 className='mb-2 text-wrap text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {name}
          </h5>
        </a>
        <p className='dark:text-white-400 mb-3 font-normal text-gray-700'>
          <strong>Status: </strong> {status}
        </p>

        <p className='dark:text-white-400 mb-3 font-normal text-gray-700'>
          <strong>Species: </strong> {species}
        </p>

        <div className='flex flex-row items-center justify-between'>
          <button onClick={toggleFavorite}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill={`${favorite ? 'white' : 'none'}`}
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-max w-8'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
              />
            </svg>
          </button>
          <a
            href={`/Personaje?id=${id}`}
            className='inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800'
          >
            Details
          </a>
        </div>
      </div>
    </div>
  )
}

export default CharacterCard
