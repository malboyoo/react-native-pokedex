export interface PokemonI {
  id: number;
  name: string;
  url: string;
  weight: number;
  height: number;
  moves: {
    move: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  cries: {
    latest: string;
  };
}

export interface PokemonSpecieI {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
    version: {
      name: string;
    };
  }[];
}
