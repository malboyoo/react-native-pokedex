import { PokemonI, PokemonSpecieI } from "@/interface/pokemon";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const endpoint = "https://pokeapi.co/api/v2/";

type API = {
  "/pokemon?limit=21": {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
      name: string;
      url: string;
    }[];
  };
  "/pokemon/[id]": PokemonI;
  "/pokemon-species/[id]": PokemonSpecieI;
};

export function useFetchQuery<T extends keyof API>(path: T, params?: Record<string, string | number>) {
  const localUrl = params ? endpoint + path.replace("[id]", params.id as string) : endpoint + path;
  return useQuery({
    queryKey: [localUrl],
    queryFn: async () => {
      const response = await fetch(localUrl);
      return response.json() as Promise<API[T]>;
    },
  });
}

export function useInfiniteFetchQuery<T extends keyof API>(path: T) {
  return useInfiniteQuery({
    queryKey: [path],
    initialPageParam: endpoint + path,
    queryFn: async ({ pageParam }) => {
      const response = await fetch(pageParam);
      return response.json() as Promise<API[T]>;
    },
    getNextPageParam: (lastPage, pages) => lastPage.next,
  });
}
