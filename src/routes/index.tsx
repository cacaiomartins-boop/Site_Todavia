import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Brain, Clock, MapPin, Menu, Monitor, Quote, Star, Users, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import logo from "@/assets/todavia-logo-transparent.png";
import heroPhoto from "@/assets/sala-atendimento.jpg";

const mapQuery = encodeURIComponent(site.address);
const mapsViewUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
const mapsEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
const whatsappUrl = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.message)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Psicanálise em Curitiba e Online | Todavia Psicanálise" },
      { name: "description", content: "Clínica de psicanálise em Curitiba e online, com atendimento para adolescentes e adultos. Conheça os profissionais da Todavia." },
      { property: "og:title", content: "Psicanálise em Curitiba e Online | Todavia Psicanálise" },
      { property: "og:description", content: "Conheça a Todavia Psicanálise e seus profissionais em Curitiba e online." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const links = [
  ["Escuta", "#escuta"], ["Profissionais", "#profissionais"], ["Como funciona", "#como-funciona"], ["Dúvidas", "#duvidas"],
] as const;

function SectionLabel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <p className={`section-label ${dark ? "text-sage" : "text-rust"}`}>{children}</p>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let ticking = false;
    const applyScrollEffects = () => {
      setScrolled(window.scrollY > 48);
      if (heroImgRef.current && !reduceMotion) {
        const offset = Math.min(window.scrollY * 0.15, 140);
        heroImgRef.current.style.transform = `scale(1.12) translate3d(0, ${offset}px, 0)`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(applyScrollEffects);
        ticking = true;
      }
    };
    applyScrollEffects();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  return (
    <main className="overflow-x-hidden bg-background text-foreground">
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all ${scrolled || menuOpen ? "border-sand bg-linen/95 text-foreground backdrop-blur-md" : "border-transparent text-paper"}`}>
        <div className="site-container flex h-20 items-center justify-between">
          <a href="#topo"><img src={logo} alt="Todavia Psicanálise" className={`h-auto w-28 transition ${scrolled || menuOpen ? "" : "logo-invert"}`} /></a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            {links.map(([label, href]) => <a key={href} href={href} className="text-sm transition-opacity hover:opacity-60">{label}</a>)}
            <Button asChild variant={scrolled ? "default" : "paper"}><a href="#profissionais">Escolher profissional</a></Button>
          </nav>
          <Button type="button" variant="ghost" size="icon" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} className="lg:hidden" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="border-t border-sand bg-linen px-5 py-6 text-foreground lg:hidden">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block border-b border-sand py-4 font-display text-2xl">{label}</a>)}</nav>}
      </header>

      <section id="topo" className="relative flex min-h-[92svh] items-end overflow-hidden bg-forest pt-32 text-paper">
        <img ref={heroImgRef} src={heroPhoto} alt="" aria-hidden="true" fetchPriority="high" className="absolute inset-0 h-full w-full origin-center object-cover opacity-50 will-change-transform" style={{ transform: "scale(1.12)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/75 via-forest/55 to-forest/35" aria-hidden="true" />
        <div className="site-container relative z-10 grid items-end gap-12 pb-12 md:pb-16 lg:grid-cols-[1.25fr_.75fr]">
          <div className="max-w-4xl hero-enter">
            <p className="section-label mb-6 text-sage">{site.eyebrow}</p>
            <h1 className="max-w-4xl font-display text-[clamp(3.2rem,7.5vw,7rem)] leading-[0.94]">Há palavras que só chegam quando encontram <em className="text-sage">tempo.</em></h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-paper/80">{site.heroText}</p>
            <div className="mt-9 flex flex-wrap gap-3"><Button asChild variant="paper" size="lg"><a href="#profissionais">Conhecer profissionais <ArrowDown /></a></Button></div>
          </div>
          <aside className="hero-enter">
            <div className="border-l border-sage/50 pl-6">
              <p className="font-display text-2xl italic text-sage">“Todavia”</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper/70">Uma palavra que não encerra. Faz pausa, contrapõe e permite que outra coisa seja dita.</p>
            </div>
            <div className="mt-8 hidden max-w-xs rounded-[20px] border border-sage/30 bg-forest/50 p-6 backdrop-blur-sm lg:block">
              <div className="flex items-center gap-1 text-terracotta-light" aria-label="Avaliação 5 estrelas">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={16} strokeWidth={0} fill="currentColor" />)}
              </div>
              <p className="mt-2 text-sm text-paper/80">Avaliação 5 estrelas nos perfis dos profissionais</p>
              <dl className="mt-5 space-y-3 border-t border-sage/25 pt-5 text-sm text-paper/85">
                <div className="flex items-center gap-2.5"><Clock size={16} strokeWidth={1.5} className="shrink-0 text-sage" /><span>Atendimento sob agendamento</span></div>
                <div className="flex items-center gap-2.5"><MapPin size={16} strokeWidth={1.5} className="shrink-0 text-sage" /><span>Batel · Curitiba, PR</span></div>
                <div className="flex items-center gap-2.5"><Monitor size={16} strokeWidth={1.5} className="shrink-0 text-sage" /><span>Presencial e online</span></div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-sand bg-paper py-6">
        <div className="site-container flex flex-wrap items-center justify-center gap-2.5 sm:gap-3" data-reveal>
          {[
            { icon: Brain, label: "Psicanálise" },
            { icon: MapPin, label: "Curitiba · PR" },
            { icon: Monitor, label: "Atendimento online" },
            { icon: Users, label: "Adolescentes e adultos" },
          ].map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-2 rounded-full border border-sand bg-linen px-4 py-2 text-xs font-medium text-moss sm:text-sm">
              <Icon size={14} strokeWidth={1.6} className="shrink-0 text-terracotta" />
              {label}
            </span>
          ))}
        </div>
      </section>

      <section id="escuta" className="section-space bg-linen">
        <div className="site-container grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div className="self-start lg:sticky lg:top-28" data-reveal><SectionLabel>01 — A escuta</SectionLabel><h2 className="section-title mt-5">Quando algo se repete e você <em>não entende</em> por quê.</h2><p className="mt-7 max-w-md text-lg leading-relaxed text-moss">{site.intro}</p></div>
          <div className="border-t border-sand">{site.audiences.map((item, index) => <article key={item.title} data-reveal className="grid gap-4 border-b border-sand py-8 sm:grid-cols-[5rem_1fr]"><span className="font-display text-5xl text-terracotta">{String(index + 1).padStart(2, "0")}</span><div><h3 className="font-display text-3xl">{item.title}</h3><p className="mt-2 leading-relaxed text-moss">{item.text}</p></div></article>)}</div>
        </div>
      </section>

      <section id="profissionais" className="section-space bg-sand">
        <div className="site-container grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:items-center">
          <div data-reveal>
            <SectionLabel>02 — Profissionais</SectionLabel>
            <h2 className="section-title mt-5">Duas escutas, um compromisso com o <em>singular.</em></h2>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-moss">Conheça quem trabalha na Todavia. As informações abaixo foram reunidas a partir dos perfis públicos de cada profissional.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {site.professionals.map((person) => <Link key={person.name} to="/profissionais/$slug" params={{ slug: person.slug }} data-reveal className="professional-card group relative block aspect-[4/5] overflow-hidden bg-forest"><img src={person.image} alt={person.imageAlt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"/><div className="professional-card-shade absolute inset-0"/><div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-paper sm:gap-5 sm:p-7 lg:p-8"><div><h3 className="font-display text-xl leading-tight sm:text-3xl lg:text-2xl lg:leading-snug">{person.name}</h3><p className="mt-1 text-[10px] font-medium uppercase leading-snug tracking-[0.08em] text-paper/80 sm:mt-2.5 sm:text-sm lg:text-xs lg:tracking-[0.14em]">{person.specialty}</p></div><ArrowRight className="mb-1 hidden shrink-0 transition-transform group-hover:translate-x-1 sm:mb-2 sm:block" aria-hidden="true"/></div></Link>)}
          </div>
        </div>
      </section>

      <section className="section-space bg-paper"><div className="site-container grid gap-12 lg:grid-cols-2"><div data-reveal><SectionLabel>03 — A proposta</SectionLabel><h2 className="section-title mt-5">A pressa quer concluir. A análise permite <em>continuar.</em></h2></div><div data-reveal className="border-l-2 border-terracotta pl-7"><Quote className="text-sage" strokeWidth={1.25} size={40}/><p className="mt-7 font-display text-3xl leading-snug">Não se trata de adaptar a vida a uma fórmula, mas de escutar como cada pessoa construiu seu modo de estar no mundo.</p><p className="mt-5 leading-relaxed text-moss">O trabalho acontece pela palavra, pelas pausas e pelo que retorna. Cada processo tem seu tempo e suas próprias questões.</p></div></div></section>

      <section id="como-funciona" className="section-space bg-forest text-paper"><div className="site-container"><div data-reveal><SectionLabel dark>04 — Como funciona</SectionLabel><h2 className="section-title mt-5 max-w-3xl">Do primeiro contato até a <em className="text-sage">continuidade.</em></h2></div><div className="mt-14 grid gap-0 md:grid-cols-2 lg:grid-cols-4">{site.steps.map((step, index) => <article data-reveal key={step.title} className="border-t border-sage/40 py-7 md:border-l md:px-6 lg:first:border-l-0"><span className="font-display text-5xl text-terracotta-light">0{index + 1}</span><h3 className="mt-8 font-display text-2xl">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-paper/65">{step.text}</p></article>)}</div></div></section>

      <section id="duvidas" className="section-space bg-linen"><div className="site-container grid gap-14 lg:grid-cols-[.75fr_1.25fr]"><div className="self-start lg:sticky lg:top-28" data-reveal><SectionLabel>05 — Dúvidas</SectionLabel><h2 className="section-title mt-5">Perguntas <em>frequentes.</em></h2><p className="mt-6 max-w-sm leading-relaxed text-moss">Para informações específicas, consulte o perfil do profissional escolhido.</p></div><div>{site.faqs.map((item, index) => <details key={item.question} open={index === 0} data-reveal className="group border-b border-sand py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-2xl"><span>{item.question}</span><span className="text-rust transition-transform group-open:rotate-45">+</span></summary><p className="max-w-2xl pt-4 leading-relaxed text-moss">{item.answer}</p></details>)}</div></div></section>

      <section className="bg-forest py-20 text-paper"><div className="site-container grid gap-10 lg:grid-cols-[.8fr_1fr_1fr] lg:items-start"><div data-reveal><SectionLabel dark>06 — Contato</SectionLabel><h2 className="section-title mt-5">Comece por uma <em className="text-sage">conversa.</em></h2></div><div data-reveal className="border-l border-sage/40 pl-7"><p className="font-display text-3xl leading-snug">Fale com a gente pelo WhatsApp para tirar dúvidas ou agendar uma primeira conversa.</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="paper" size="lg"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Falar no WhatsApp <ArrowUpRight /></a></Button></div></div><div data-reveal className="overflow-hidden rounded-[20px] border border-sage/30 bg-forest"><a href={mapsViewUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-5 text-sm leading-relaxed text-paper/90 transition-colors hover:text-sage"><MapPin className="mt-0.5 shrink-0" size={18} strokeWidth={1.5} /><span>{site.address}</span></a><iframe src={mapsEmbedUrl} title="Localização da Todavia Psicanálise" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-64 w-full border-0 grayscale-[15%]" /></div></div></section>

      <footer className="border-t border-sage/30 bg-forest py-10 text-paper"><div className="site-container"><div className="grid gap-8 md:grid-cols-3"><div><img src={logo} alt="Todavia Psicanálise" className="logo-invert h-auto w-44"/><p className="mt-4 text-xs text-paper/55">{site.note}</p></div><div className="text-sm text-paper/65"><p>Curitiba · Paraná</p><p>Atendimento presencial e online</p></div><nav className="flex flex-col gap-2 text-sm md:items-end">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav></div><div className="mt-10 flex flex-col justify-between gap-3 border-t border-sage/30 pt-6 text-xs text-paper/50 md:flex-row"><span>© 2026 · Todavia Psicanálise</span><span>Em caso de emergência, ligue 188 (CVV) ou 192 (SAMU).</span></div></div></footer>
    </main>
  );
}
