import { BaseResponse } from "./Common";

export type Pokemon = BaseResponse & {
  id: number;
};

interface Abilites {
  ability: BaseResponse;
  base_experience: number;
  is_hidden: boolean;
  slot: number;
}

interface Sprite {
  front_default: string;
  back_default: string;
  front_female: string | null;
  back_female: string | null;
  front_shiny: string | null;
  back_shiny: string | null;
  front_shiny_female: string | null;
  back_shiny_female: string | null;
}

type AditionalSprite = Partial<Sprite>;

export interface PokemonDetail {
  abilities: Abilites[];
  base_experience: number;
  forms: BaseResponse[];
  height: number;
  id: number;
  is_default: boolean;
  name: string;
  order: number;
  sprites: Sprite & {
    other: { [key: string]: AditionalSprite };
    versions: {
      [key: string]: AditionalSprite & {
        [key: string]: AditionalSprite;
      };
    };
  };
  weight: number;
}
