'use client';

import { getCharacters } from 'rickmortyapi';
import { useState, useEffect } from 'react';
import CharacterCard from "./Components/CharacterCard";
import NavBar from "./Components/Navbar";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]); 
  useEffect(() => {
    const fetchAndTransformCharacters = async () => {
      try {
        const charactersData = await getCharacters();
        const transformedCharacters: Character[] = charactersData.data.results.map((char: Character) => ({
          id: char.id,
          name: char.name,
          status: char.status,
          species: char.species,
          image: char.image,
        }));
        setCharacters(transformedCharacters); 
      } catch (error) {
        console.error('Error fetching and transforming characters:', error);
      }
    };

    fetchAndTransformCharacters(); 
  }, []);

  return (
    <div>
    <NavBar></NavBar>  

    <div className="grid grid-cols-1 md:grid-cols-3 gap-7 place-items-center">
        
      {characters.map((character) => (
  <div key={character.id}>
    <CharacterCard
      id={character.id}
      name={character.name}
      status={character.status}
      species={character.species}
      image={character.image}
    />
  </div>
))}
  </div>

    </div>
  );
};

export default Home;
