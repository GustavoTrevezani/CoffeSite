import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Product } from "@/types/product";

export function useUpdateProduct() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (product: Product) => {
            const table =
                product.type === "coffee"
                    ? "Coffee"
                    : product.type === "food"
                    ? "Food"
                    : "Drink";

            const { error } = await supabase
                .from(table)
                .update(product)
                .eq("id", product.id);

            if (error) throw error;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["products"] });
        },
    });
}
