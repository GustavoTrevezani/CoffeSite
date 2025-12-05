import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Product } from "@/types/product";

export function useCreateProduct() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (product: Product) => {
            const table =
                product.type === "coffee"
                    ? "Coffee"
                    : product.type === "food"
                    ? "Food"
                    : "Drink";

            const { error } = await supabase.from(table).insert(product);
            if (error) throw error;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["products"] });
        },
    });
}
