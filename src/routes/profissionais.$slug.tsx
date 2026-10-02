import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, GraduationCap, MapPin, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import logo from "@/assets/todavia-logo-transparent.png";

const whatsappUrl = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.message)}`;

function findProfessional(slug: string) {
  return site.professionals.find((professional) => professional.slug === slug);
}

export const Route = createFileRoute("/profissionais/$slug")({
  loader: ({ params }) => {
    const professional = findProfessional(params.slug);
    if (!professional) throw notFound();
    return professional;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Profissional não encontrado | Todavia Psicanálise" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name}, ${loaderData.role} | Todavia Psicanálise`;
    const description = `Conheça ${loaderData.name}, ${loaderData.specialty.toLowerCase()}, com atendimento ${loaderData.formats.toLowerCase()} em ${loaderData.location}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProfessionalNotFound,
  component: ProfessionalPage,
});

function ProfessionalPage() {
  const professional = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-linen text-foreground">
      <header className="border-b border-sand bg-linen">
        <div className="site-container flex h-20 items-center justify-between">
          <Link to="/" aria-label="Página inicial da Todavia"><img src={logo} alt="Todavia Psicanálise" className="h-auto w-28" /></Link>
          <Button asChild variant="ghost"><Link to="/" hash="profissionais"><ArrowLeft /> Profissionais</Link></Button>
        </div>
      </header>

      <section className="section-space">
        <div className="site-container grid items-center gap-12 lg:grid-cols-[.88fr_1.12fr] lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-sand">
            <img src={professional.image} alt={professional.imageAlt} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="section-label text-rust">Profissional Todavia</p>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(3.2rem,6vw,6rem)] leading-[.96]">{professional.name}</h1>
            <p className="mt-5 text-sm font-medium uppercase tracking-[0.16em] text-rust">{professional.specialty}</p>
            <p className="mt-9 max-w-2xl text-lg leading-relaxed text-moss">{professional.bio}</p>

            <dl className="mt-10 grid gap-6 border-y border-sand py-7 sm:grid-cols-2">
              <div><dt className="section-label text-rust">Atendimento</dt><dd className="mt-2 flex items-center gap-2 text-moss"><Monitor strokeWidth={1.4} />{professional.formats}</dd></div>
              <div><dt className="section-label text-rust">Localização</dt><dd className="mt-2 flex items-center gap-2 text-moss"><MapPin strokeWidth={1.4} />{professional.location}</dd></div>
              <div><dt className="section-label text-rust">Público</dt><dd className="mt-2 text-moss">{professional.ages ?? professional.audience}</dd></div>
              <div><dt className="section-label text-rust">Abordagem</dt><dd className="mt-2 text-moss">{professional.approach}</dd></div>
            </dl>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button asChild size="lg"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Contato e agendamento <ArrowUpRight /></a></Button>
              <span className="text-sm text-moss">Informações pelo {professional.source}</span>
            </div>

            {professional.extraLinks?.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {professional.extraLinks.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-sand bg-paper px-4 py-1.5 text-sm text-moss transition-colors hover:border-terracotta hover:text-terracotta">
                    {link.label} <ArrowUpRight size={14} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            ) : null}

            {professional.education?.length ? (
              <div className="mt-10 border-t border-sand pt-7">
                <p className="section-label flex items-center gap-2 text-rust"><GraduationCap size={16} strokeWidth={1.6} /> Formação</p>
                <ul className="mt-4 space-y-2">
                  {professional.education.map((item) => <li key={item} className="flex gap-3 leading-relaxed text-moss"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />{item}</li>)}
                </ul>
              </div>
            ) : null}

            {professional.experience ? (
              <div className="mt-8 border-t border-sand pt-7">
                <p className="section-label text-rust">Trajetória</p>
                <p className="mt-4 leading-relaxed text-moss">{professional.experience}</p>
              </div>
            ) : null}

            {professional.focusAreas?.length ? (
              <div className="mt-8 border-t border-sand pt-7">
                <p className="section-label text-rust">Áreas de atuação</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {professional.focusAreas.map((item) => <span key={item} className="rounded-full border border-sand bg-paper px-4 py-1.5 text-sm text-moss">{item}</span>)}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <footer className="border-t border-sage/30 bg-forest py-8 text-paper">
        <div className="site-container flex flex-col justify-between gap-3 text-sm text-paper/65 sm:flex-row"><span>Todavia Psicanálise</span><span>Curitiba · atendimento presencial e online</span></div>
      </footer>
    </main>
  );
}

function ProfessionalNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linen px-5 text-center">
      <div><p className="section-label text-rust">Todavia Psicanálise</p><h1 className="mt-4 font-display text-5xl">Profissional não encontrado.</h1><Button asChild className="mt-8"><Link to="/">Voltar à página inicial</Link></Button></div>
    </main>
  );
}