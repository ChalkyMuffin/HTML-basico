"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import NavBar from "../Components/Navbar";
import { getCharacters } from 'rickmortyapi';

function CharacterProfilePage() {
  const idParams = useSearchParams();
  const characterId = idParams.get("id");
  const [character, setCharacter] = useState({
    id: 0,
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
    origin: {
      name: "",
      url: "",
    },
    location: {
      name: "",
      url: "",
    },
    image: "",
    episode: [],
    url: "",
    created: "",
  });
  const [firstEpisode, setFirstEpisode] = useState("");

  const fetchCharacter = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${characterId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch character");
      }
      const data = await response.json();
      setCharacter(data);
    } catch (error) {
      console.error("Error fetching character:", error);
    }
  };

  const fetchFirstEpisode = async () => {
    try {
      const response = await fetch(`${character.episode[0]}`);
      if (!response.ok) {
        throw new Error("Failed to fetch first episode");
      }
      const data = await response.json();
      setFirstEpisode(data.name!);
    } catch (error) {
      console.error("Error fetching character:", error);
    }
  };
  useEffect(() => {
    if (characterId) {
      fetchCharacter();
    }
  }, [characterId, fetchCharacter]);

  useEffect(() => {
    if (characterId) {
      fetchFirstEpisode();
    }
  }, [character, fetchFirstEpisode]);

  return (
    <>
      <NavBar></NavBar>
      <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-amber-400 w-full mb-6 shadow-lg rounded-xl mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div className="relative">
                <img
                  src={character.image}
                  className="shadow-xl align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                />
              </div>
            </div>
            <div className="w-full text-center mt-20">
              <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    {character.episode.length}
                  </span>
                  <span className="text-sm text-white-400">Episodes</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-2">
            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {character.name}
            </h3>
            <div className="text-xs mt-0 mb-2 text-white-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              {character.location.name}
            </div>
          </div>
          <div className="mt-6 py-6 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4">
                <p className="font-normal leading-relaxed text-slate-600 mb-4">
                  <strong>Status: </strong> {character.status}
                </p>
                <p className="font-normal leading-relaxed text-slate-600 mb-4">
                  <strong>Species: </strong> {character.species}
                </p>
                <p className="font-normal leading-relaxed text-slate-600 mb-4">
                  <strong>Type: </strong> {character.type}
                </p>
                <p className="font-normal leading-relaxed text-slate-600 mb-4">
                  <strong>Gender: </strong> {character.gender}
                </p>
                <p className="font-normal leading-relaxed text-slate-600 mb-4">
                  <strong>First episode: </strong> {firstEpisode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CharacterProfilePage;