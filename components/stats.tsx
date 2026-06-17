const stats = [
  { value: "15+", label: "Години опит" },
  { value: "500+", label: "Доволни клиенти" },
  { value: "100%", label: "Съответствие" },
  { value: "24/7", label: "Поддръжка" },
]

export function Stats() {
  return (
    <section className="py-20 bg-card border-y border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-semibold tracking-tight">{stat.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
