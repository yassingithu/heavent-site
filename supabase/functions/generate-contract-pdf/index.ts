import { getCaller, deny } from "../_shared/auth.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const getContractTemplate = (language: string, staffData: any, contractData: any) => {
  const templates = {
    fr: {
      title: "CONTRAT DE TRAVAIL",
      company: "HEAVENT PEOPLE AGENCY",
      employee: "L'EMPLOYÉ(E)",
      employer: "L'EMPLOYEUR",
      article1: "ARTICLE 1 - OBJET DU CONTRAT",
      article1Content: `La société ${staffData.company || 'HEAVENT PEOPLE AGENCY'} engage ${staffData.prenom} ${staffData.nom}, né(e) le ${staffData.date_naissance} à ${staffData.lieu_naissance}, de nationalité ${staffData.nationalite}, demeurant ${staffData.adresse_complete}, ${staffData.code_postal} ${staffData.ville}, en qualité de ${contractData.titre}.`,
      article2: "ARTICLE 2 - DURÉE ET DÉBUT D'EXÉCUTION",
      article2Content: `Le présent contrat est un contrat à ${contractData.type_contrat}. Il prend effet le ${contractData.date_debut}${contractData.date_fin ? ` et se termine le ${contractData.date_fin}` : ''}.`,
      article3: "ARTICLE 3 - RÉMUNÉRATION ET HORAIRES",
      article3Content: `En contrepartie de son travail, l'employé(e) percevra une rémunération de ${contractData.taux_horaire} MAD par heure pour ${contractData.heures_prestations} heures de prestation par semaine, soit un salaire brut de ${contractData.salaire_brut} MAD par semaine.`,
      article4: "ARTICLE 4 - LIEU DE TRAVAIL",
      article4Content: `L'employé(e) exercera ses fonctions principalement à ${contractData.lieu_travail || 'différents lieux selon les événements'}.`,
      article5: "ARTICLE 5 - DISPOSITIONS DIVERSES",
      article5Content: "Le présent contrat est soumis aux dispositions du Code du travail marocain et aux conventions collectives applicables.",
      signatures: "SIGNATURES",
      employeeSignature: "L'Employé(e)",
      employerSignature: "L'Employeur"
    },
    en: {
      title: "EMPLOYMENT CONTRACT",
      company: "HEAVENT PEOPLE AGENCY",
      employee: "THE EMPLOYEE",
      employer: "THE EMPLOYER",
      article1: "ARTICLE 1 - CONTRACT PURPOSE",
      article1Content: `The company ${staffData.company || 'HEAVENT PEOPLE AGENCY'} hires ${staffData.prenom} ${staffData.nom}, born on ${staffData.date_naissance} in ${staffData.lieu_naissance}, nationality ${staffData.nationalite}, residing at ${staffData.adresse_complete}, ${staffData.code_postal} ${staffData.ville}, as ${contractData.titre}.`,
      article2: "ARTICLE 2 - DURATION AND START DATE",
      article2Content: `This contract is a ${contractData.type_contrat} contract. It takes effect on ${contractData.date_debut}${contractData.date_fin ? ` and ends on ${contractData.date_fin}` : ''}.`,
      article3: "ARTICLE 3 - REMUNERATION AND HOURS",
      article3Content: `In return for their work, the employee will receive a remuneration of ${contractData.taux_horaire} MAD per hour for ${contractData.heures_prestations} hours of service per week, which equals a gross salary of ${contractData.salaire_brut} MAD per week.`,
      article4: "ARTICLE 4 - WORKPLACE",
      article4Content: `The employee will perform their duties mainly at ${contractData.lieu_travail || 'various locations according to events'}.`,
      article5: "ARTICLE 5 - MISCELLANEOUS PROVISIONS",
      article5Content: "This contract is subject to the provisions of the Moroccan Labor Code and applicable collective agreements.",
      signatures: "SIGNATURES",
      employeeSignature: "The Employee",
      employerSignature: "The Employer"
    },
    ar: {
      title: "عقد العمل",
      company: "وكالة هيفنت بيبل",
      employee: "الموظف",
      employer: "صاحب العمل",
      article1: "المادة الأولى - موضوع العقد",
      article1Content: `تقوم شركة ${staffData.company || 'وكالة هيفنت بيبل'} بتوظيف ${staffData.prenom} ${staffData.nom}، المولود في ${staffData.date_naissance} في ${staffData.lieu_naissance}، الجنسية ${staffData.nationalite}، المقيم في ${staffData.adresse_complete}، ${staffData.code_postal} ${staffData.ville}، في منصب ${contractData.titre}.`,
      article2: "المادة الثانية - المدة وتاريخ البدء",
      article2Content: `هذا العقد هو عقد ${contractData.type_contrat}. يسري اعتباراً من ${contractData.date_debut}${contractData.date_fin ? ` وينتهي في ${contractData.date_fin}` : ''}.`,
      article3: "المادة الثالثة - الأجر وساعات العمل",
      article3Content: `مقابل عمله، سيتلقى الموظف أجراً قدره ${contractData.taux_horaire} درهم في الساعة لـ ${contractData.heures_prestations} ساعة خدمة في الأسبوع، أي راتب إجمالي قدره ${contractData.salaire_brut} درهم في الأسبوع.`,
      article4: "المادة الرابعة - مكان العمل",
      article4Content: `سيؤدي الموظف مهامه بشكل أساسي في ${contractData.lieu_travail || 'مواقع مختلفة حسب الأحداث'}.`,
      article5: "المادة الخامسة - أحكام متنوعة",
      article5Content: "يخضع هذا العقد لأحكام قانون العمل المغربي والاتفاقيات الجماعية المعمول بها.",
      signatures: "التوقيعات",
      employeeSignature: "الموظف",
      employerSignature: "صاحب العمل"
    }
  };

  const template = templates[language as keyof typeof templates] || templates.fr;
  
  return `
    <!DOCTYPE html>
    <html dir="${language === 'ar' ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <title>${template.title} - ${staffData.prenom} ${staffData.nom}</title>
        <style>
            body {
                font-family: ${language === 'ar' ? "'Amiri', 'Traditional Arabic'" : "'Times New Roman', serif"};
                margin: 40px;
                line-height: 1.6;
                color: #333;
                direction: ${language === 'ar' ? 'rtl' : 'ltr'};
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #2563eb;
                padding-bottom: 20px;
                margin-bottom: 40px;
            }
            .company-name {
                font-size: 24px;
                font-weight: bold;
                color: #2563eb;
                margin-bottom: 10px;
            }
            .contract-title {
                font-size: 28px;
                font-weight: bold;
                color: #1e40af;
                margin: 20px 0;
            }
            .article {
                margin: 30px 0;
                page-break-inside: avoid;
            }
            .article-title {
                font-size: 18px;
                font-weight: bold;
                color: #1e40af;
                margin-bottom: 15px;
                border-bottom: 1px solid #e5e7eb;
                padding-bottom: 5px;
            }
            .article-content {
                text-align: justify;
                margin-bottom: 20px;
                line-height: 1.8;
            }
            .employee-info {
                background: #f8fafc;
                padding: 20px;
                border-left: 4px solid #2563eb;
                margin: 20px 0;
                border-radius: 4px;
            }
            .signatures {
                margin-top: 60px;
                display: flex;
                justify-content: space-between;
                page-break-inside: avoid;
            }
            .signature-block {
                text-align: center;
                width: 45%;
                border-top: 1px solid #000;
                padding-top: 10px;
                margin-top: 80px;
            }
            .date-place {
                margin: 40px 0;
                text-align: center;
                font-style: italic;
            }
            @media print {
                body { margin: 20px; }
                .signatures { page-break-inside: avoid; }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="company-name">${template.company}</div>
            <h1 class="contract-title">${template.title}</h1>
        </div>

        <div class="employee-info">
            <strong>${template.employee}:</strong><br>
            ${staffData.prenom} ${staffData.nom}<br>
            ${staffData.adresse_complete}<br>
            ${staffData.code_postal} ${staffData.ville}<br>
            Tél: ${staffData.telephone}<br>
            Email: ${staffData.email}<br>
            ${staffData.numero_identite ? `N° Identité: ${staffData.numero_identite}<br>` : ''}
            ${staffData.numero_securite_sociale ? `N° Sécurité sociale: ${staffData.numero_securite_sociale}<br>` : ''}
            ${staffData.iban ? `IBAN: ${staffData.iban}` : ''}
        </div>

        <div class="article">
            <div class="article-title">${template.article1}</div>
            <div class="article-content">${template.article1Content}</div>
        </div>

        <div class="article">
            <div class="article-title">${template.article2}</div>
            <div class="article-content">${template.article2Content}</div>
        </div>

        <div class="article">
            <div class="article-title">${template.article3}</div>
            <div class="article-content">${template.article3Content}</div>
        </div>

        <div class="article">
            <div class="article-title">${template.article4}</div>
            <div class="article-content">${template.article4Content}</div>
        </div>

        <div class="article">
            <div class="article-title">${template.article5}</div>
            <div class="article-content">${template.article5Content}</div>
        </div>

        <div class="date-place">
            Fait à ${contractData.lieu_signature || staffData.ville}, le ${new Date().toLocaleDateString(language === 'ar' ? 'ar-MA' : language === 'en' ? 'en-GB' : 'fr-FR')}
        </div>

        <div class="signatures">
            <div class="signature-block">
                <strong>${template.employeeSignature}</strong><br>
                ${staffData.prenom} ${staffData.nom}
            </div>
            <div class="signature-block">
                <strong>${template.employerSignature}</strong><br>
                ${template.company}
            </div>
        </div>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { contract_id, language = 'fr' } = await req.json();
    const caller = await getCaller(req);
    if (!caller) return deny();
    if (!caller.isAdmin) {
      const { data: c } = await supabase.from('contrats').select('staff_id').eq('id', contract_id).maybeSingle();
      if (!c || c.staff_id !== caller.staffId) return deny();
    }

    if (!contract_id) {
      return new Response(
        JSON.stringify({ error: "ID du contrat requis" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Récupérer les données du contrat et du staff
    const { data: contractData, error: contractError } = await supabase
      .from('contrats')
      .select(`
        *,
        staff (
          nom, prenom, email, telephone, adresse_complete, code_postal, ville,
          nationalite, date_naissance, lieu_naissance, numero_identite,
          numero_securite_sociale, iban, situation_familiale
        )
      `)
      .eq('id', contract_id)
      .single();

    if (contractError || !contractData) {
      return new Response(
        JSON.stringify({ error: "Contrat non trouvé" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Generating contract for:", contractData.staff.prenom, contractData.staff.nom, "Language:", language);

    // Générer le HTML du contrat
    const htmlContent = getContractTemplate(language, contractData.staff, contractData);

    // Retourner le HTML
    return new Response(htmlContent, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `inline; filename="contrat-${contractData.staff.prenom}-${contractData.staff.nom}-${language}.html"`,
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in generate-contract-pdf function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);