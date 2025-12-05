import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";

export function useDeleteProduct() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            type,
        }: {
            id: number;
            type: "coffee" | "food" | "drinks";
        }) => {
            const table =
                type === "coffee"
                    ? "Coffee"
                    : type === "food"
                    ? "Food"
                    : "Drink";

            const { error } = await supabase.from(table).delete().eq("id", id);

            if (error) throw error;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["products"] });
        },
    });
}
