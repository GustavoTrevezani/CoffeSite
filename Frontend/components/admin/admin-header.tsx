"use client"

import { useRouter } from "next/navigation"

export function AdminHeader() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("baristaAuth")
    router.push("/")
  }

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">☕</div>
            <h1 className="text-2xl font-bold">CaféMundo - Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-primary-foreground text-primary rounded-lg hover:bg-primary-foreground/90 transition-colors font-medium"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}
