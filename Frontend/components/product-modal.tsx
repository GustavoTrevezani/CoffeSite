"use client";

import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface ProductModalProps {
    product: Product;
    onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose} // clique no overlay fecha
        >
            <div
                ref={modalRef}
                tabIndex={-1} // permite foco programático
                role="dialog"
                aria-modal="true"
                aria-label={`Detalhes do produto ${product.name}`}
                onClick={(e) => e.stopPropagation()} // evita fechar quando clica dentro do modal
                className="bg-card rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
                {/* Header with close button */}
                <div className="sticky top-0 bg-card border-b border-border flex items-center justify-between p-4">
                    <h2 className="text-xl font-bold text-card-foreground">
                        Detalhes do Produto
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-muted rounded-full transition-colors"
                        aria-label="Fechar modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Product image */}
                    <div className="mb-6">
                        <img
                            src={
                                product.image_url?.trim() ||
                                "/images/placeholder.svg"
                            }
                            alt={product.name}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div>

                    {/* Product info */}
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold mb-2 text-card-foreground">
                            {product.name}
                        </h3>
                        <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-3xl font-bold text-primary">
                                R$ {product.price.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-card-foreground mb-2">
                            Descrição
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Details */}
                    {product.ingredients && (
                        <div className="mb-6 bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold text-card-foreground mb-2">
                                Características
                            </h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                {product.ingredients
                                    .split(",")
                                    .map((ingredient, index) => (
                                        <li key={index}>
                                            • {ingredient.trim()}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}

                    {/* Add to cart button */}
                    <Button
                        size="lg"
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                    >
                        Adicionar ao Carrinho
                    </Button>
                </div>
            </div>
        </div>
    );
}
