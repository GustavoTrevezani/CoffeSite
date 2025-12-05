"use client";

import { useState } from "react";
import { LoginModal } from "./login-modal";

export function Header() {
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <>
            <header className="bg-primary text-primary-foreground shadow-md">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="text-3xl">☕</div>
                            <div>
                                <h1 className="text-3xl font-bold">
                                    CaféMundo
                                </h1>
                                <p className="text-sm text-primary-foreground/80">
                                    Seu catálogo de café premium
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowLoginModal(true)}
                            className="px-4 py-2 bg-primary-foreground text-primary rounded-lg hover:bg-primary-foreground/90 transition-colors font-medium"
                        >
                            Área do Barista
                        </button>
                    </div>
                </div>
            </header>
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </>
    );
}
