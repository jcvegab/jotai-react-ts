import { atom } from "jotai";
import { getPokemonId } from "./methods";
import { Result } from "./types/Common";
import { Pokemon, PokemonDetail } from "./types/Pokemon";
export const API_REST = "https://pokeapi.co/api/v2";

// ReadAndWrite Atoms
export const pokemonFilters = atom({
  offset: 0,
  limit: 10
});

export const pokemonAtom = atom<Pokemon[]>([]);

// ReadOnly Atom
const filterParams = atom((get) => {
  const { offset, limit } = get(pokemonFilters);
  return `?limit=${limit}&offset=${offset}`;
});

// Async Atom
export const pokemonDataFetch = atom<Promise<Pokemon[]>>(async (get) => {
  const response = await fetch(`${API_REST}/pokemon${get(filterParams)}`);
  const data = await response.json();
  return data.results.map((result: Result) => ({
    id: getPokemonId(result.url),
    ...result
  }));
});

// Pokemon

export const currentPokemonId = atom<number>(0);

export const currentPokemonFetch = atom(async (get) => {
  if (get(currentPokemonId) === 0) return;
  const response = await fetch(`${API_REST}/pokemon/${get(currentPokemonId)}`);
  const data = await response.json();
  return data as PokemonDetail;
});

// Ability

export const currentAbilityId = atom<number>(0);

export const currentAbilityFetch = atom(async (get) => {
  if (get(currentAbilityId) === 0) return;
  const response = await fetch(`${API_REST}/ability/${get(currentAbilityId)}`);
  const data = await response.json();
  return data;
});
