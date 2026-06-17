import { Button } from "@/components/ui/button"
import { ArrowRight, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const teamMembers = [
  {
    name: "Пепа Кънчева",
    role: "Главен счетоводител",
    specialty: "Данъчен експерт и финансов консултант",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%9F%D0%B5%D0%BF%D0%B0-KtkKKVsbBUFThesePbeVB1VcRsLps7.png",
  },
  {
    name: "Антоан Рушидов",
    role: "Управител",
    specialty: "Производство, търговия и износ",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%90%D0%BD%D1%82%D0%BE%D0%B0%D0%BD-C1yh7KnIkyDJREMe31KFS9o2wK3Gzg.png",
  },
  {
    name: "Владислав Атанасов",
    role: "Младши счетоводител",
    specialty: "Услуги и търговия",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D1%81%D0%BB%D0%B0%D0%B2-nuvNivTmligBp4rTckOXekvQ34PqhV.png",
  },
  {
    name: "Марина Азгорова",
    role: "Счетоводител",
    specialty: "Отговорник и специалист ЗДДС",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%9C%D0%B0%D1%80%D0%B8%D0%BD%D0%B0-dp44GsMw3mWzYKvAmcu0HycYfGYjvT.png",
  },
  {
    name: "Йоана Христова",
    role: "Счетоводител",
    specialty: "Експерт ТРЗ, личен състав и осигуряване",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%99%D0%BE%D0%B0%D0%BD%D0%B0-Zp8FktvYgWpAWmCwPTXSDSmVVs98hB.png",
  },
  {
    name: "Силвия Стефанова",
    role: "Счетоводител",
    specialty: "Експерт счетоводство и финанси",
    image: "https://rqt8f2dldo9sqmkn.public.blob.vercel-storage.com/silviya.jpg",
  },
]

export function About() {
  return (
    <section id="about" className="py-28 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase mb-4">Нашият екип</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance mb-6">
            Екипът зад вашия финансов успех
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {'Работим като ваш вътрешен финансов отдел \u2013 с ясна комуникация, навременни отчети и проактивни препоръки.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted mb-4 relative">
                {member.image ? (
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <User className="w-16 h-16 text-muted-foreground/40" />
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-foreground">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
              {member.specialty && (
                <p className="text-xs text-muted-foreground/70 mt-1">{member.specialty}</p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="group" asChild>
            <Link href="#contact">
              Свържете се с нас
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}