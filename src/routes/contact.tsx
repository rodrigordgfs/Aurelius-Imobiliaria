import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PublicNav } from "@/components/site/PublicNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contato — Aurelius Imobiliaria" },
      { name: "description", content: "Entre em contato com o escritório privado Aurelius. Respondemos em até um dia útil." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [market, setMarket] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !inquiry.trim()) {
      toast.error("Preencha nome, e-mail e consulta.");
      return;
    }
    if (!email.includes("@")) {
      toast.error("Informe um e-mail válido.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    toast.success("Consulta recebida. Um sócio responderá em até um dia útil.");
    setName("");
    setEmail("");
    setPhone("");
    setMarket("");
    setInquiry("");
  };

  return (
    <div className="min-h-screen bg-onyx text-ink">
      <PublicNav />
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 pb-32 pt-40 md:grid-cols-12">
        <div className="md:col-span-5">
          <span className="eyebrow">Escritório privado</span>
          <h1 className="mt-6 font-serif text-5xl md:text-6xl">Inicie um relacionamento.</h1>
          <p className="mt-6 max-w-md text-ink-muted">
            Nossos sócios respondem pessoalmente em até um dia útil. Todas as consultas são
            tratadas com absoluta confidencialidade.
          </p>

          <div className="mt-12 space-y-6">
            {[
              {
                id: "moinhos",
                title: "Moinhos de Vento",
                address: "Rua Padre Chagas, 79 · 90430-001",
                phone: "+55 51 3333 0000",
              },
              {
                id: "auxiliadora",
                title: "Auxiliadora",
                address: "Av. Carlos Gomes, 700 · 90480-000",
                phone: "+55 51 3333 0001",
              },
            ].map((office) => (
              <div key={office.id} className="border-l-2 border-line pl-4">
                <div className="font-serif text-lg">
                  Porto Alegre · {office.title}
                </div>
                <div className="mt-1 text-sm text-ink-muted">{office.address}</div>
                <div className="number mt-1 text-sm text-ink-muted">{office.phone}</div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-line bg-surface/40 p-8 md:col-span-7"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Nome" placeholder="Seu nome completo" value={name} onChange={setName} />
            <Field label="E-mail" placeholder="voce@exemplo.com" value={email} onChange={setEmail} />
            <Field label="Telefone" placeholder="Opcional" value={phone} onChange={setPhone} />
            <Field label="Bairro de interesse" placeholder="ex.: Moinhos de Vento, Bela Vista" value={market} onChange={setMarket} />
          </div>
          <div className="mt-5">
            <label className="eyebrow">Consulta</label>
            <textarea
              rows={6}
              value={inquiry}
              onChange={(e) => setInquiry(e.target.value)}
              placeholder="Conte-nos sobre a residência que procura ou a residência que está considerando colocar conosco."
              className="mt-2 w-full resize-none rounded-md border border-line bg-onyx px-4 py-3 text-sm placeholder:text-ink-dim focus:border-gold focus:outline-none"
            />
          </div>
          <div className="mt-8 flex items-center justify-between">
            <p className="text-[11px] text-ink-dim">Todas as consultas são confidenciais.</p>
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-gold px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground disabled:opacity-60"
            >
              {loading ? "Enviando…" : "Enviar consulta"}
            </button>
          </div>
        </form>
      </section>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="eyebrow">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-line bg-onyx px-4 py-3 text-sm placeholder:text-ink-dim focus:border-gold focus:outline-none"
      />
    </div>
  );
}
