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
        <rect x="0" y="40" width="64" height="86" fill={c.c2} opacity={c.rayures === "unie" ? 1 : 0} />
        <rect x="236" y="40" width="64" height="86" fill={c.c2} opacity={c.rayures === "unie" ? 1 : 0} />
        <path d="M105 16L150 62L195 16" fill={c.c2} stroke={c.texte} strokeWidth="4" strokeLinejoin="round" opacity=".95" />
        <path d="M16 96l40-24M284 96l-40-24" stroke="#A8933F" strokeWidth="4" />
      </g>
      <path d="M105 16c14 14 76 14 90 0l58 28 32 52-40 24-18-20v118H73V100l-18 20-40-24 32-52z" fill="none" stroke="rgba(0,0,0,.25)" strokeWidth="2" />
      {logo
        ? <image href={logo} x="123" y="66" width="54" height="54" preserveAspectRatio="xMidYMid meet" />
        : <text x="150" y="108" textAnchor="middle" fontSize="40" fill={c.texte} opacity=".8" fontFamily="Gloock, Georgia, serif">{(prenom ?? "H").slice(0, 1).toUpperCase()}</text>}
      {prenom && <text x="150" y="168" textAnchor="middle" fontSize={prenom.length > 12 ? 14 : prenom.length > 9 ? 19 : prenom.length > 6 ? 25 : 30} fontWeight="700" fill={c.texte} fontFamily="Gloock, Georgia, serif" letterSpacing="2" textLength={prenom.length > 9 ? 120 : undefined} lengthAdjust="spacingAndGlyphs">{prenom.toUpperCase().slice(0, 16)}</text>}
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
  if (!svg) return <div className="inv-decor" aria-hidden="true" />;
  return <div className="inv-decor" data-decor={id} aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />;
}
