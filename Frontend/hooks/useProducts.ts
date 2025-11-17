import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/data/products";

export function useProducts(category: "Coffee" | "Food" | "Drinks") {
    return useQuery({
        queryKey: ["products", category],
        queryFn: () => getProducts(category),
        staleTime: 1000 * 60 * 60 * 24, // 24 horas sem refetch
        refetchOnWindowFocus: false,
        gcTime: 1000 * 60 * 60 * 24 * 7, // <-- substitui o cacheTime
    });
}
