export const capitalize = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const getPokemonId = (url: string): number => {
  const { pathname } = new URL(url);
  const regex = /\/api\/v2\/pokemon\/(?<pokemonId>\d+)\//;
  const [_, pokemonId] = pathname.match(regex) ?? [];
  const id = Number(pokemonId);
  return isNaN(id) ? 0 : id;
};

export const getId = (url: string): number => {
  const { pathname } = new URL(url);
  const regex = /\/api\/v2\/\w+\/(?<modelId>\d+)\//;
  const [_, modelId] = pathname.match(regex) ?? [];
  const id = Number(modelId);
  return isNaN(id) ? 0 : id;
};
