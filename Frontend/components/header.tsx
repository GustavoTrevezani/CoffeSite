export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl">☕</div>
          <div>
            <h1 className="text-3xl font-bold">CaféMundo</h1>
            <p className="text-sm text-primary-foreground/80">Seu catálogo de café premium</p>
          </div>
        </div>
      </div>
    </header>
  )
}
