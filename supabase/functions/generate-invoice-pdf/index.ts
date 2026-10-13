import { getCaller, deny } from "../_shared/auth.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InvoiceRequest {
  devis_id: string;
  type: "entreprise" | "mariage";
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { devis_id, type }: InvoiceRequest = await req.json();
    const caller = await getCaller(req);
    if (!caller?.isAdmin) return deny();

    console.log("Generating invoice for:", { devis_id, type });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch devis data
    const tableName = type === "entreprise" ? "devis_entreprise" : "devis_mariage";
    const { data: devis, error } = await supabase
      .from(tableName)
      .select("*")
      .eq("id", devis_id)
      .single();

    if (error) {
      console.error("Error fetching devis:", error);
      throw error;
    }

    if (!devis) {
      throw new Error("Devis not found");
    }

    // Generate invoice number
    const invoiceNumber = `FACT-${Date.now()}`;
    const invoiceDate = new Date().toLocaleDateString('fr-FR');
    const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'); // 30 days from now

    // Generate HTML invoice
    const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facture ${invoiceNumber}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Arial', sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px; 
            background: white;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            border-radius: 10px 10px 0 0;
            text-align: center;
            margin-bottom: 0;
        }
        .header h1 {
            font-size: 36px;
            font-weight: bold;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            background: white;
            padding: 40px;
            border: 1px solid #e5e7eb;
            border-top: none;
        }
        .invoice-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #f3f4f6;
        }
        .invoice-info h2 {
            color: #667eea;
            font-size: 28px;
            margin-bottom: 10px;
        }
        .invoice-details {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .client-info {
            background: #f1f5f9;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .client-info h3 {
            color: #475569;
            margin-bottom: 15px;
            font-size: 18px;
        }
        .service-table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .service-table th {
            background: #667eea;
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
        }
        .service-table td {
            padding: 15px;
            border-bottom: 1px solid #e5e7eb;
        }
        .service-table tr:nth-child(even) {
            background: #f8fafc;
        }
        .total-section {
            background: #f1f5f9;
            padding: 25px;
            border-radius: 8px;
            margin-top: 30px;
            text-align: right;
        }
        .total-amount {
            font-size: 24px;
            font-weight: bold;
            color: #667eea;
            margin-top: 10px;
        }
        .footer {
            background: #1f2937;
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 0 0 10px 10px;
            margin-top: 40px;
        }
        .footer p {
            margin-bottom: 10px;
        }
        .payment-info {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            padding: 20px;
            border-radius: 8px;
            margin: 30px 0;
        }
        .payment-info h3 {
            color: #92400e;
            margin-bottom: 15px;
        }
        @media print {
            body { padding: 0; }
            .header, .content, .footer { border-radius: 0; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>HEAVENT AGENCY</h1>
        <p>Votre partenaire événementiel de confiance</p>
    </div>

    <div class="content">
        <div class="invoice-header">
            <div class="invoice-info">
                <h2>FACTURE</h2>
                <p><strong>N° :</strong> ${invoiceNumber}</p>
                <p><strong>Date :</strong> ${invoiceDate}</p>
                <p><strong>Échéance :</strong> ${dueDate}</p>
            </div>
        </div>

        <div class="client-info">
            <h3>Facturer à :</h3>
            <p><strong>${devis.prenom} ${devis.nom}</strong></p>
            ${type === "entreprise" ? `<p>${devis.entreprise}</p>` : ""}
            <p>Email : ${devis.email}</p>
            ${devis.telephone ? `<p>Téléphone : ${devis.telephone}</p>` : ""}
            ${devis.lieu ? `<p>Lieu : ${devis.lieu}</p>` : ""}
        </div>

        <div class="invoice-details">
            <h3>Détails de l'événement :</h3>
            ${type === "entreprise" ? 
              `<p><strong>Date :</strong> ${devis.date_evenement ? new Date(devis.date_evenement).toLocaleDateString('fr-FR') : 'Non spécifiée'}</p>
               <p><strong>Nombre de personnes :</strong> ${devis.nb_personnes || 'Non spécifié'}</p>
               <p><strong>Nombre de staff :</strong> ${devis.nb_staff || 'Non spécifié'}</p>` :
              `<p><strong>Date :</strong> ${devis.date_mariage ? new Date(devis.date_mariage).toLocaleDateString('fr-FR') : 'Non spécifiée'}</p>
               <p><strong>Nombre d'invités :</strong> ${devis.nb_invites || 'Non spécifié'}</p>
               <p><strong>Type d'événement :</strong> ${devis.type_evenement || 'Mariage'}</p>`
            }
            ${devis.services ? `<p><strong>Services :</strong> ${devis.services}</p>` : ""}
        </div>

        <table class="service-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantité</th>
                    <th>Prix unitaire</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Prestations événementielles${type === "entreprise" ? " - Événement d'entreprise" : " - Événement privé"}</td>
                    <td>1</td>
                    <td>${devis.montant_total ? devis.montant_total.toLocaleString('fr-FR') : '0'} MAD</td>
                    <td>${devis.montant_total ? devis.montant_total.toLocaleString('fr-FR') : '0'} MAD</td>
                </tr>
            </tbody>
        </table>

        <div class="total-section">
            <p><strong>Sous-total :</strong> ${devis.montant_total ? devis.montant_total.toLocaleString('fr-FR') : '0'} MAD</p>
            <p><strong>TVA (20%) :</strong> ${devis.montant_total ? (devis.montant_total * 0.2).toLocaleString('fr-FR') : '0'} MAD</p>
            <div class="total-amount">
                <strong>TOTAL TTC : ${devis.montant_total ? (devis.montant_total * 1.2).toLocaleString('fr-FR') : '0'} MAD</strong>
            </div>
        </div>

        <div class="payment-info">
            <h3>Informations de paiement</h3>
            <p><strong>Modalités :</strong> Paiement à 30 jours</p>
            <p><strong>Mode de paiement :</strong> Virement bancaire, chèque ou espèces</p>
            <p><strong>Coordonnées bancaires :</strong> Disponibles sur demande</p>
        </div>

        ${devis.remarques ? `
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Remarques :</h3>
            <p>${devis.remarques}</p>
        </div>
        ` : ""}
    </div>

    <div class="footer">
        <p><strong>HEAVENT AGENCY</strong></p>
        <p>Votre partenaire événementiel de confiance</p>
        <p>Contact : contact@heaventagency.com</p>
        <p>Merci de votre confiance !</p>
    </div>
</body>
</html>`;

    console.log("Invoice HTML generated successfully");

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in generate-invoice-pdf function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);