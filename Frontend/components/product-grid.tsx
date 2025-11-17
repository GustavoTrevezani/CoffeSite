import { ProductCard } from "./product-card";
import type { Product } from "@/types/product";

interface ProductGridProps {
    products: Product[];
    onProductClick: (product: Product) => void;
}

export function ProductGrid({ products, onProductClick }: ProductGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onImageClick={() => onProductClick(product)}
                />
            ))}
        </div>
    );
}
