import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Product } from "@/types/product";

export function useAllProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: async (): Promise<Product[]> => {
            const { data: coffee } = await supabase.from("Coffee").select("*");
            const { data: food } = await supabase.from("Food").select("*");
            const { data: drinks } = await supabase.from("Drinks").select("*");

            const mappedCoffee = (coffee ?? []).map((p) => ({
                ...p,
                type: "coffee",
            }));
            const mappedFood = (food ?? []).map((p) => ({
                ...p,
                type: "food",
            }));
            const mappedDrinks = (drinks ?? []).map((p) => ({
                ...p,
                type: "drinks",
            }));

            return [...mappedCoffee, ...mappedFood, ...mappedDrinks];
        },
    });
}
