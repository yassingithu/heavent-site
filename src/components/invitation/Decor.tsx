import { useEffect, useState } from "react";
import { clubDe } from "@/lib/decors";

/** Dessins du dossier assets/decors, chargés à la demande (un seul sera téléchargé). */
const FICHIERS = import.meta.glob("../../assets/decors/*.svg", { query: "?raw", import: "default" }) as Record<string, () => Promise<string>>;

interface Props { id: string; club?: string; logo?: string; prenom?: string }

function Maillot({ club, logo, prenom }: { club?: string; logo?: string; prenom?: string }) {
  const c = clubDe(club);
  const bandes = c.rayures === "verticales" ? [0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={60 + i * 30} y="30" width="30" height="190" fill={i % 2 ? c.c2 : c.c1} />) : <rect x="60" y="30" width="180" height="190" fill={c.c1} />;
  return (
    <svg viewBox="0 0 300 250" role="img" aria-label={`Maillot ${c.nom}`}>
      <defs><clipPath id="mail"><path d="M105 16c14 14 76 14 90 0l58 28 32 52-40 24-18-20v118H73V100l-18 20-40-24 32-52z" /></clipPath></defs>
      <g clipPath="url(#mail)">
        {bandes}
        <rect x="0" y="0" width="300" height="250" fill={c.c1} opacity={c.rayures === "unie" ? 1 : 0} />
        <rect x="0" y="40" width="64" height="86" fill={c.c2} opacity={c.rayures === "unie" ? 0.55 : 0} />
        <rect x="236" y="40" width="64" height="86" fill={c.c2} opacity={c.rayures === "unie" ? 0.55 : 0} />
        <path d="M105 16c14 14 76 14 90 0v22c-14 14-76 14-90 0z" fill="none" stroke={c.texte} strokeWidth="5" opacity=".9" />
      </g>
      <path d="M105 16c14 14 76 14 90 0l58 28 32 52-40 24-18-20v118H73V100l-18 20-40-24 32-52z" fill="none" stroke="rgba(0,0,0,.25)" strokeWidth="2" />
      {logo
        ? <image href={logo} x="123" y="66" width="54" height="54" preserveAspectRatio="xMidYMid meet" />
        : <circle cx="150" cy="92" r="20" fill="none" stroke={c.texte} strokeWidth="3" opacity=".55" />}
      {prenom && <text x="150" y="168" textAnchor="middle" fontSize="30" fontWeight="700" fill={c.texte} fontFamily="Inter, system-ui, sans-serif" letterSpacing="2">{prenom.toUpperCase().slice(0, 9)}</text>}
    </svg>
  );
}

function Ballon() {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Ballon de football">
      <circle cx="100" cy="100" r="90" fill="#fff" stroke="#1b1b1b" strokeWidth="4" />
      <polygon points="100,62 134,86 121,126 79,126 66,86" fill="#1b1b1b" />
      <g stroke="#1b1b1b" strokeWidth="4" strokeLinecap="round">
        <path d="M100 62V12M134 86l50-18M121 126l30 44M79 126l-30 44M66 86L16 68" />
      </g>
      <g fill="#1b1b1b"><polygon points="100,12 128,26 120,14" opacity="0" /></g>
      <path d="M32 60c20-28 48-42 68-44M168 60c-20-28-48-42-68-44" fill="none" stroke="rgba(0,0,0,.08)" strokeWidth="14" />
    </svg>
  );
}

export default function Decor({ id, club, logo, prenom }: Props) {
  const [svg, setSvg] = useState<string>("");
  useEffect(() => {
    let vivant = true; setSvg("");
    const cle = Object.keys(FICHIERS).find((k) => k.endsWith(`/${id}.svg`));
    if (cle) FICHIERS[cle]().then((s) => { if (vivant) setSvg(s); }).catch(() => undefined);
    return () => { vivant = false; };
  }, [id]);
  if (id === "maillot") return <div className="inv-decor inv-decor-maillot"><Maillot club={club} logo={logo} prenom={prenom} /></div>;
  if (id === "ballon") return <div className="inv-decor inv-decor-ballon"><Ballon /></div>;
  if (!svg) return <div className="inv-decor" aria-hidden="true" />;
  return <div className="inv-decor" data-decor={id} aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />;
}
