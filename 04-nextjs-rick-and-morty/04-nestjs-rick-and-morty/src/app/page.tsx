'use client'

import { getCharacter } from 'rickmortyapi'
import { useState, useEffect } from 'react';
import { fetchFromAPI } from '@/api/api';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: any;
}

const rick = await getCharacter(1)

async function fetchAndTransformCharacter(): Promise<any> {
  const rick = await getCharacter(1);
  const transformedRick: Character = {
    id: rick.data.id,
    name: rick.data.name,
    status: rick.data.status,
    species: rick.data.species,
    image: rick.data.image
  };

  console.log(transformedRick)

  return transformedRick;
}



const Home = () => {
  const [rick, setRick] = useState<Character | null>(null); // Initialize rick as null

  useEffect(() => {
    const fetchAndTransformCharacter = async () => {
      try {
        const rickData = await getCharacter(1);
        const transformedRick: Character = {
          id: rickData.data.id,
          name: rickData.data.name,
          status: rickData.data.status,
          species: rickData.data.species,
          image: rickData.data.image,
        };
        setRick(transformedRick); // Set rick state with transformed data
      } catch (error) {
        console.error('Error fetching and transforming character:', error);
      }
    };

    fetchAndTransformCharacter(); // Call the function on component mount
  }, []);



  return (
    <div>
      <h1>Rickymartin</h1>
      {rick && ( // Render only if rick data is available
        <div>
          <h2>{rick.name}</h2>
          <p>Status: {rick.status}</p>
          <p>Species: {rick.species}</p>
          <img src={rick.image} alt={rick.name} />
        </div>
      )}
    </div>
  );


};

export default Home;
