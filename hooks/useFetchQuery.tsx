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
};

export function useFetchQuery<T extends keyof API>(path: T) {
  return useQuery({
    queryKey: [path],
    queryFn: async () => {
      await wait(1000);
      const response = await fetch(endpoint + path);
      return response.json() as Promise<API[T]>;
    },
  });
}

export function useInfiniteFetchQuery<T extends keyof API>(path: T) {
  return useInfiniteQuery({
    queryKey: [path],
    initialPageParam: endpoint + path,
    queryFn: async ({ pageParam }) => {
      await wait(1000);
      const response = await fetch(pageParam);
      return response.json() as Promise<API[T]>;
    },
    getNextPageParam: (lastPage, pages) => lastPage.next,
  });
}

function wait(ms: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
