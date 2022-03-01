import { debounce } from "lodash";
import { ChangeEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";

import { useAtom, useAtomValue } from "jotai";
import { pokemonFilters, pokemonDataFetch } from "../atoms";
import { capitalize } from "../methods";

export default function Home() {
  const pokemons = useAtomValue(pokemonDataFetch);
  const [filters, setFilters] = useAtom(pokemonFilters);

  const [limit, setLimit] = useState<number>(10);

  const setDebounce = useCallback(
    debounce((_limitVal) => {
      setFilters(_limitVal);
    }, 1000),
    []
  );

  const onChangeLimit = (e: ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(e.target.value, 10));
    setDebounce({
      ...filters,
      limit: parseInt(e.target.value, 10),
      offset: 0
    });
  };

  const onChangeOffset = (type: "add" | "subtract") => {
    let value: number;
    if (type === "subtract" && filters.offset === 0) return;
    if (type === "add") value = filters.offset + filters.limit;
    if (type === "subtract") value = filters.offset - filters.limit;
    return () => {
      setFilters({
        ...filters,
        offset: value
      });
    };
  };

  const currentPage = filters.offset / filters.limit + 1;
  return (
    <>
      <p>Limit</p>
      <input
        name="limit"
        type="number"
        value={limit}
        min="1"
        onChange={onChangeLimit}
      />
      <p>Page: {currentPage}</p>
      <div className="paginate-buttons">
        <button name="offset" onClick={onChangeOffset("subtract")}>
          Previous Page
        </button>
        <button name="offset" onClick={onChangeOffset("add")}>
          Next Page
        </button>
      </div>
      <main className="pokemon-links">
        {pokemons.map(({ id, name }, index) => (
          <div key={index}>
            <h3>{capitalize(name)}</h3>
            <Link to={`/pokemon/${id}`}>
              <button>Ver descripción</button>
            </Link>
          </div>
        ))}
      </main>
    </>
  );
}
