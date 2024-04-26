'use client';

import { getCharacters } from 'rickmortyapi';
import { useState, useEffect } from 'react';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]); // Initialize characters as an empty array

  useEffect(() => {
    const fetchAndTransformCharacters = async () => {
      try {
        const charactersData = await getCharacters({ page: 1 });
        const transformedCharacters: Character[] = charactersData.data.results.map((char: any) => ({
          id: char.id,
          name: char.name,
          status: char.status,
          species: char.species,
          image: char.image,
        }));
        setCharacters(transformedCharacters); // Set characters state with transformed data
      } catch (error) {
        console.error('Error fetching and transforming characters:', error);
      }
    };

    fetchAndTransformCharacters(); // Call the function on component mount
  }, []);

  return (
    <div>
      <h1>Rickymartin</h1>
      {characters.map((character) => (
        <div key={character.id}>
          <h2>{character.name}</h2>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <img src={character.image} alt={character.name} />
        </div>
      ))}
    </div>
  );
};

export default Home;
