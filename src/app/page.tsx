"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { useSession } from "next-auth/react";
import ButtonSignOut from "@/components/ButtonSignOut";
import ButtonGithub from "@/components/ButtonGithub";
import CardPokemon from "@/components/cardPokemon";

type cardPokemon = {
  name: string;
  types: string[];
  image: string;
};

type pokeProps = {
  name: string;
  url: string;
};

export default function Page() {
  const { data: session } = useSession();
  const [counter, setCounter] = useState(0);
  const [pokemons, setPokemons] = useState<cardPokemon[]>([]);

  const handlePageChange = (e: number) => {
    setPokemons([]);
    setCounter(counter + e);
    console.log(counter);
  };

  const fetchPokeapi = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${counter}&limit=20`
      );
      const pokemonList = response.data.results;

      const newPokemons: cardPokemon[] = await Promise.all(
        pokemonList.map(async (pokemon: pokeProps) => {
          const pokemonDetailsResponse = await axios.get(pokemon.url);
          const pokemonDetails = pokemonDetailsResponse.data;

          const types: string[] = pokemonDetails.types.map(
            (type: any) => type.type.name
          );

          return {
            name: pokemonDetails.name,
            types: types,
            image:
              pokemonDetails.sprites.other["official-artwork"].front_default,
          };
        })
      );

      setPokemons([...pokemons, ...newPokemons]);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchPokeapi();
  }, [counter]);

  return (
    <>
      <div className="flex justify-end">
        <div className="px-4 py-4">
          {session ? <ButtonSignOut /> : <ButtonGithub />}
        </div>
      </div>

      <div className="container mx-auto ">
        <div className="flex justify-center">
          <Image
            src={
              "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
            }
            alt="jeje"
            width={257}
            height={100}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {pokemons.map((pokemon, index) => (
            <CardPokemon
              key={index}
              name={pokemon.name}
              type={pokemon.types}
              image={pokemon.image}
            />
          ))}

          <div className="flex mx-4 mt-4 justify-center col-span-2 md:col-span-4">
            <button
              disabled={counter === 0}
              onClick={() => handlePageChange(-20)}
              className="relative inline-flex mx-8 items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ChevronLeftIcon className="h-5 w-5" />
              Anterior
            </button>
            <button
              disabled={counter === 1300}
              onClick={() => handlePageChange(20)}
              className="relative ml-3 inline-flex mx-8 items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Siguiente
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
