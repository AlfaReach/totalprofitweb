import { Button } from "@/components/ui/button"
import { ArrowRight, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { authorProfiles } from "@/lib/authors"

/**
 * Single source of truth for the team: lib/authors.ts.
 *
 * The same six people previously existed here AND in lib/authors.ts. They agreed, but
 * nothing enforced it — updating a job title in one place and not the other would put
 * the visible team grid out of step with the Person schema on /za-nas, which is an
 * E-E-A-T inconsistency rather than just untidiness.
 */
export const teamMembers = authorProfiles

// NOTE: this component renders on both / and /za-nas. /za-nas has no contact form,
// so the CTA must be the absolute /#contact-form, not a bare same-page anchor.
//
// `linkProfiles` is used only on /za-nas. That page previously rendered this grid AND a
// second "Профили на екипа" list of the same six people. The duplicate is gone; the team
// cards themselves now carry the links to /avtori/*, so the author pages keep their
// internal links without the same six names appearing twice on one page.
export function About({ linkProfiles = false }: { linkProfiles?: boolean } = {}) {
  return (
    <section id="about" className="py-28 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase mb-4">Нашият екип</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance mb-6">
            Екипът зад вашия финансов успех
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {'Екипът на Total Profit включва счетоводители и специалисти по ТРЗ, ДДС и данъчни консултации.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 mb-12">
          {teamMembers.map((member) => {
            const body = (
              <>
                <div className="aspect-square rounded-2xl overflow-hidden bg-muted mb-4 relative">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={400}
                      sizes="(max-width: 767px) 45vw, (max-width: 1023px) 30vw, 176px"
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
                  <p className="text-xs text-muted-foreground/90 mt-1">{member.specialty}</p>
                )}
              </>
            )

            return linkProfiles ? (
              <Link key={member.slug} href={`/avtori/${member.slug}`} className="block text-center group">
                {body}
              </Link>
            ) : (
              <div key={member.slug} className="text-center group">
                {body}
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="group" asChild>
            <Link href="/#contact-form">
              Свържете се с нас
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
