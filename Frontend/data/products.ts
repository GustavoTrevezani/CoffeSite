import { supabase } from "@/lib/supabaseClient";
import { Product } from "@/types/product";

export async function getProducts(
    table: "Coffee" | "Food" | "Drinks"
): Promise<Product[]> {
    const { data, error } = await supabase.from(table).select("*");

    if (error) {
        console.error("Erro ao buscar produtos:", error);
        return [];
    }

    return data as Product[];
}
