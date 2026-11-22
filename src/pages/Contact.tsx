import { suivre } from "@/lib/suivi";
import { FUNCTIONS_URL, supabase } from "@/integrations/supabase/client";
import Seo from "@/components/Seo";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import ChoisirRendezVous from "@/components/rendez-vous/ChoisirRendezVous";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bouton, Etoile, PageTete, Surtitre } from "@/components/seuil/Seuil";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTexte } from "@/i18n/textes";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"), 
  subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères"),
});

type FormData = z.infer<typeof formSchema>;

const Contact = () => {
  const x = useTexte();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (window.location.hash === "#rendez-vous") setTimeout(() => document.getElementById("rendez-vous")?.scrollIntoView({ behavior: "smooth" }), 400);
  }, []);
  const langueRdv = (["en", "ar"].includes(i18n.language?.slice(0, 2)) ? i18n.language.slice(0, 2) : "fr") as "fr" | "en" | "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  type Profil = "evenement" | "mission" | "partenaire";
  const [profil, setProfil] = useState<Profil>("evenement");
  const [profilEnvoye, setProfilEnvoye] = useState<Profil>("evenement");
  const [questionOuverte, setQuestionOuverte] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.info.phone'),
      value: "+212 6 10 93 96 55",
      description: t('contact.info.phoneDescription'),
      href: "tel:+212610939655"
    },
    {
      icon: Mail,
      title: t('contact.info.email'),
      value: "info@heaventagency.com",
      description: t('contact.info.emailDescription'),
      href: "mailto:info@heaventagency.com"
    },
    {
      icon: MapPin,
      title: t('contact.info.address'),
      value: t('contact.info.addressValue'),
      description: t('contact.info.addressDescription'),
      href: "#"
    },
    {
      icon: Instagram,
      title: t('contact.info.instagram'),
      value: "@heaventagency",
      description: t('contact.info.instagramDescription'),
      href: "https://instagram.com/heaventagency"
    }
  ];

  const PREFIXES: Record<Profil, string> = { evenement: "", mission: "Candidature — ", partenaire: "Partenaire — " };
  const choisirProfil = (p: Profil) => { setProfil(p); setQuestionOuverte(false); };
  const exemples: Record<Profil, string> = { evenement: "Ex: Demande d'information, devis événement...", mission: "Ex: ma disponibilité pour une mission", partenaire: "Ex: proposition de partenariat" };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setProfilEnvoye(profil);
    
    try {
      // Le message est gardé en base avant l'e-mail : s'il se perd dans la messagerie, il reste lisible dans l'admin
      const sujetComplet = PREFIXES[profil] + data.subject;
      const { error: erreurBase } = await (supabase as any).from("messages_contact").insert({ nom: data.name.trim().slice(0, 200), email: data.email.trim().slice(0, 320), sujet: sujetComplet.slice(0, 300), message: data.message.trim().slice(0, 5000) });
      let emailOk = false;
      try {
      const response = await fetch(`${FUNCTIONS_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          data: { ...data, subject: PREFIXES[profil] + data.subject }
        }),
      });
      emailOk = response.ok;
      } catch { emailOk = false; }

      if (erreurBase) console.error("Message de contact non enregistré en base :", erreurBase.message);
      // Échec seulement si ni la base ni l'e-mail n'ont reçu le message
      if (!emailOk && erreurBase) {
        throw new Error('Erreur lors de l\'envoi');
      }
      suivre("demande", "contact");

      toast({
        title: t('contact.form.success'),
        description: t('contact.form.successDescription'),
      });
      
      setIsSubmitted(true);
      reset();
    } catch (error: any) {
      console.error('❌ Erreur envoi contact:', error);
      
      let errorMessage = t('contact.form.errorDescription');
      
      if (error.message?.includes('Network')) {
        errorMessage = x("Problème de connexion. Vérifiez votre connexion internet.");
      } else if (error.message?.includes('500')) {
        errorMessage = x("Erreur serveur temporaire. Veuillez réessayer dans quelques instants.");
      }
      
      toast({
        title: t('contact.form.error'),
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="s-platre">
        <div className="s-section s-wrap">
          <div className="s-fairepart s-merci">
            <Etoile /><Etoile className="bas" />
            <h1 className="s-h3">{x("Message envoyé !")}</h1>
            {profilEnvoye === "mission" ? (
              <>
                <p className="s-texte" style={{ marginTop: 14 }}>{x("Votre question est bien reçue. Les candidatures se font uniquement en ligne.")}</p>
                <div className="s-actions" style={{ justifyContent: "center", marginTop: 24 }}>
                  <Link to="/inscription-staff" className="s-btn s-btn-or" data-testid="contact-merci-candidature">{x("Faire ma candidature")}<span className="fl" aria-hidden="true">→</span></Link>
                </div>
                <p className="s-profil-aide" style={{ marginTop: 18 }}><button type="button" className="s-profil-lien" onClick={() => setIsSubmitted(false)}>{x("Envoyer un nouveau message")}</button></p>
              </>
            ) : (
              <>
                <p className="s-texte" style={{ marginTop: 14 }}>{x("Votre message a été envoyé avec succès. Notre équipe va l'examiner et vous répondra sous 24h.")}</p>
                <div className="s-actions" style={{ justifyContent: "center", marginTop: 24 }}>
                  <button type="button" className="s-btn s-btn-plein s-sombre" onClick={() => setIsSubmitted(false)}>{x("Envoyer un nouveau message")}</button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      <Seo page="contact" />
      <PageTete court surtitre={x("Contact")} titre={t('contact.title')} chapo={t('contact.subtitle')}>
        <div className="s-actions s-entree-heros" style={{ animationDelay: ".2s" }}>
          <Bouton href="#rendez-vous" variante="plein" fleche>{{ fr: "Prendre rendez-vous", en: "Book an appointment", ar: "احجز موعداً" }[langueRdv]}</Bouton>
          <Bouton href="https://wa.me/212610939655" variante="filet" externe>{x("Chattez avec nous")} · WhatsApp</Bouton>
        </div>
        <p className="s-candidat-ligne s-entree-heros" style={{ animationDelay: ".3s" }} data-testid="contact-candidature-haut">{x("Vous cherchez une mission d'hôte ou d'hôtesse ?")} <Link to="/inscription-staff" className="s-lien-or">{x("Faire ma candidature")} <span className="fl" aria-hidden="true">→</span></Link></p>
      </PageTete>

      {/* Prise de rendez-vous en ligne */}
      <section className="s-papier" id="rendez-vous" style={{ scrollMarginTop: 64 }}>
        <div className="s-section s-wrap s-colonnes">
          <div className="s-col-q" data-revele="" dir={langueRdv === "ar" ? "rtl" : "ltr"}>
            <Surtitre>{x("Rendez-vous")}</Surtitre>
            <h2 className="s-h2" style={{ marginTop: 20, fontSize: "clamp(32px, 8vw, 56px)" }}>{{ fr: "Prendre rendez-vous", en: "Book an appointment", ar: "احجز موعداً" }[langueRdv]}</h2>
            <p className="s-texte" style={{ marginTop: 16 }}>{{ fr: "Choisissez directement un créneau pour parler de votre événement avec nous.", en: "Pick a time slot directly to talk about your event with us.", ar: "اختر موعداً مباشرة للتحدث معنا عن مناسبتك." }[langueRdv]}</p>
          </div>
          <div className="s-col-r s-form" dir={langueRdv === "ar" ? "rtl" : "ltr"}>
            <div style={{ padding: "22px 16px" }}>
              <ChoisirRendezVous langue={langueRdv} source="contact" />
            </div>
          </div>
        </div>
      </section>

      {/* Coordonnées et message */}
      <section className="s-platre">
        <div className="s-section s-wrap s-colonnes">
          <div className="s-col-q">
            <Surtitre>{x("Coordonnées")}</Surtitre>
            <ul className="s-liste" style={{ marginTop: 24 }}>
              {contactInfo.map((info) => (
                <li key={info.title} data-revele="" style={{ gridTemplateColumns: "1fr" }}>
                  <span className="s-surtitre" style={{ letterSpacing: ".24em" }}>{info.title}</span>
                  {info.href === "#" ? <b>{info.value}</b> : <a href={info.href} {...(info.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}><b dir={info.href.startsWith("tel:") ? "ltr" : undefined}>{info.value}</b></a>}
                  <p style={{ gridColumn: 1 }}>{info.description}</p>
                  {info.href.startsWith("mailto:") && <p className="s-candidat-ligne" style={{ gridColumn: "1 / -1" }} data-testid="contact-candidats">{x("Vous cherchez une mission d'hôte ou d'hôtesse ?")} <Link to="/inscription-staff">{x("Faire ma candidature")}</Link>. {x("Candidatures en ligne uniquement.")}</p>}
                </li>
              ))}
              <li data-revele="" style={{ gridTemplateColumns: "1fr" }}>
                <span className="s-surtitre" style={{ letterSpacing: ".24em" }}>WhatsApp</span>
                <a href="https://wa.me/212610939655" target="_blank" rel="noopener noreferrer"><b>{x("Chattez avec nous")}</b></a>
                <p style={{ gridColumn: 1 }}>{x("Réponse rapide garantie")}</p>
              </li>
              <li data-revele="" style={{ gridTemplateColumns: "1fr" }}>
                <span className="s-surtitre" style={{ letterSpacing: ".24em" }}>{x("Horaires d'ouverture")}</span>
                <p style={{ gridColumn: 1, display: "grid", gridTemplateColumns: "1fr auto", gap: "4px 16px", maxWidth: 320 }}>
                  <span>{x("Lun - Ven")}</span><span>9h00 - 18h00</span>
                  <span>{x("Samedi")}</span><span>10h00 - 16h00</span>
                  <span>{x("Dimanche")}</span><span>{x("Fermé")}</span>
                </p>
              </li>
            </ul>
          </div>

          <div className="s-col-r">
            <div className="s-form">
              <div style={{ padding: "26px 18px 22px" }}>
                <h2 className="s-h3">{x("Envoyez-nous un message")}</h2>
                <p className="s-texte" style={{ marginTop: 8, marginBottom: 22, fontSize: 15 }}>{x("Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais")}</p>
                <div className="s-profil" role="radiogroup" aria-label={x("Vous êtes…")}>
                  <span className="s-profil-t">{x("Vous êtes…")}</span>
                  {([["evenement", "Client, pour un événement"], ["mission", "Hôte ou hôtesse, pour une mission"], ["partenaire", "Prestataire partenaire"]] as [Profil, string][]).map(([k, l]) => (
                    <button key={k} type="button" role="radio" aria-checked={profil === k} tabIndex={profil === k ? 0 : -1} onKeyDown={(e) => {
                      const ordre: Profil[] = ["evenement", "mission", "partenaire"];
                      const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
                      if (!d) return;
                      e.preventDefault();
                      const n = ordre[(ordre.indexOf(k) + d + ordre.length) % ordre.length];
                      choisirProfil(n);
                      (e.currentTarget.parentElement?.querySelector(`[data-testid="contact-profil-${n}"]`) as HTMLElement | null)?.focus();
                    }} data-on={profil === k} className="s-profil-b" onClick={() => choisirProfil(k)} data-testid={`contact-profil-${k}`}>{x(l)}</button>
                  ))}
                </div>
                {profil === "mission" && (
                  <div className="s-profil-mission" data-testid="contact-panneau-candidature">
                    <p className="s-texte" style={{ fontSize: 15, color: "var(--s-nuit)" }}>{x("Les candidatures se font uniquement en ligne. Cela prend quelques minutes.")}</p>
                    <Link to="/inscription-staff" className="s-btn s-btn-or" data-testid="contact-candidature-bouton">{x("Faire ma candidature")}<span className="fl" aria-hidden="true">→</span></Link>
                    {!questionOuverte && <p className="s-profil-aide"><button type="button" className="s-profil-lien" onClick={() => setQuestionOuverte(true)} data-testid="contact-question-seulement">{x("J'ai seulement une question")}</button></p>}
                  </div>
                )}
                {profil === "partenaire" && <p className="s-profil-aide" style={{ marginBottom: 18 }}>{x("Présentez votre activité en quelques lignes ; nous vous répondons nous-mêmes.")}</p>}
                  {(profil !== "mission" || questionOuverte) && <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">{x("Nom complet *")}</Label>
                        <Input
                          id="name"
                          {...register("name")}
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive mt-1">{x(String(errors.name.message ?? ""))}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">{x("Email *")}</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive mt-1">{x(String(errors.email.message ?? ""))}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">{x("Sujet *")}</Label>
                      <div className="s-sujet">{PREFIXES[profil] && <span className="s-sujet-pre" aria-hidden="true">{PREFIXES[profil].trim()}</span>}<Input
                        id="subject"
                        placeholder={x(exemples[profil])}
                        {...register("subject")}
                        className={errors.subject ? "border-destructive" : ""}
                      /></div>
                      {errors.subject && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.subject.message ?? ""))}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="message">{x("Message *")}</Label>
                      <Textarea
                        id="message"
                        placeholder={x("Décrivez votre demande en détail...")}
                        rows={6}
                        {...register("message")}
                        className={errors.message ? "border-destructive" : ""}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.message.message ?? ""))}</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full"
                      size="lg"
                    >
                      {isSubmitting ? x("Envoi en cours...") : x("Envoyer le message")}
                      <span aria-hidden="true" className="ml-2">→</span>
                    </Button>
                  </form>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Devis direct */}
      <section className="s-papier">
        <div className="s-section s-sommaire s-wrap">
          <div className="gauche" data-revele="">
            <Surtitre>{x("Devis")}</Surtitre>
            <h2>{x("Vous préférez un devis")} {x("immédiat")}{x(" ?")}</h2>
            <p className="s-texte" style={{ marginTop: 16, maxWidth: "36ch" }}>{x("Accédez directement à nos formulaires de devis spécialisés pour une réponse plus rapide")}</p>
          </div>
          <div className="s-entrees">
            <Link to="/devis-entreprise" className="s-entree" data-revele=""><span className="num">I</span><h3>{x("Événement d'Entreprise")}</h3><span className="fl" aria-hidden="true">→</span><p>{x("Devis personnalisé pour votre événement corporate")}</p></Link>
            <Link to="/devis-mariage" className="s-entree" data-revele="" style={{ "--retard": ".08s" } as React.CSSProperties}><span className="num">II</span><h3>{x("Mariage")}</h3><span className="fl" aria-hidden="true">→</span><p>{x("Créons ensemble le mariage de vos rêves")}</p></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
