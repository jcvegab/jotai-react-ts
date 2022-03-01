import { useAtomValue, useSetAtom } from "jotai";
import { currentPokemonFetch, currentPokemonId } from "../atoms";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { capitalize, getId } from "../methods";

export default function Pokemon() {
  const { pokemonId } = useParams();
  const setPokemon = useSetAtom(currentPokemonId);
  const pokemon = useAtomValue(currentPokemonFetch);

  useEffect(() => {
    if (pokemonId && !isNaN(Number(pokemonId))) {
      setPokemon(Number(pokemonId));
    }
  }, [pokemonId, setPokemon]);

  if (!pokemon && pokemon !== 0) return null;

  const { name, abilities, base_experience, height, sprites, weight } = pokemon;
  const { front_default, back_default } = sprites;

  return (
    <div>
      <Link to={"/"}>
        <button>Ir al inicio</button>
      </Link>
      <h2>{capitalize(name)}</h2>
      <div>
        <div>
          <span>Front</span>
          <img src={front_default} alt={name} />
        </div>
        <div>
          <span>Back</span>
          <img src={back_default} alt={name} />
        </div>
      </div>
      <div>
        <h3>Abilites</h3>
        {abilities.map(({ ability }, idx) => (
          <Link key={idx} to={`/ability/${getId(ability.url)}`}>
            <button>{capitalize(ability.name)}</button>
          </Link>
        ))}
        <h3>Base Experience</h3>
        <p>{base_experience}</p>
        <h3>Height</h3>
        <p>{height}</p>
        <h3>Weight</h3>
        <p>{weight}</p>
      </div>
    </div>
  );
}
