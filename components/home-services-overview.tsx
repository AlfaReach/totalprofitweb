import Link from "next/link"
import { ArrowRight } from "lucide-react"

/**
 * Compact topical layer for the homepage.
 *
 * Purpose is narrow and deliberate: the homepage targets the two head terms
 * ("счетоводна кантора София", "счетоводни услуги София") but otherwise carries
 * only short service cards and collapsed FAQ answers — no passage that states
 * what the practice actually does, in prose, that a search engine or an answer
 * engine can extract. Four short blocks fix that and add four contextual links
 * with descriptive anchors, without turning the page into a wall of copy.
 */
const blocks = [
  {
    title: "Счетоводно обслужване на фирми",
    body: "Месечният цикъл включва обработка на документите, справки-декларации, следене на сроковете и подготовка на данните за годишното приключване. Работим по предварително уточнен процес, за да знаете какво се предава, кога и от кого.",
    href: "/schetovodno-obsluzhvane",
    cta: "Счетоводно обслужване",
  },
  {
    title: "ТРЗ и личен състав",
    body: "Заплати, осигуровки, трудови договори и уведомленията към НАП. Когато счетоводството и ТРЗ вървят в общ процес, данните за персонала не се въвеждат по два пъти и разминаванията се хващат преди подаване.",
    href: "/trz-uslugi-sofia",
    cta: "ТРЗ услуги",
  },
  {
    title: "Данъчни казуси и годишно приключване",
    body: "При по-значима сделка, промяна в дейността или въпрос по ЗДДС и ЗКПО е по-евтино да се прегледа предварително, отколкото да се коригира после. Годишното приключване тръгва от подредена текуща отчетност.",
    href: "/danachni-konsultacii",
    cta: "Данъчни консултации",
  },
  {
    title: "Стартиране и регистрации",
    body: "Регистрация на ЕООД или ООД, избор между правни форми, регистрация и дерегистрация по ЗДДС. За нов бизнес е важно решенията в началото да не създадат административна тежест по-късно.",
    href: "/registraciya-na-firma",
    cta: "Регистрация на фирма",
  },
]

export function HomeServicesOverview() {
  return (
    <section className="border-t border-border bg-secondary/40 py-16">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Как работим</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl text-balance">
            Счетоводна кантора в София за фирми, които искат подреден процес
          </h2>
        </div>

        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {blocks.map((block) => (
            <div key={block.href}>
              <h3 className="text-lg font-semibold tracking-tight">{block.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{block.body}</p>
              <Link
                href={block.href}
                className="mt-3 inline-flex items-center text-sm font-semibold text-foreground hover:underline underline-offset-4"
              >
                {block.cta}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
