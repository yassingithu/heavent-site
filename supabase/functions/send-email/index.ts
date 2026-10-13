import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: 'contact' | 'wedding' | 'business' | 'staff' | 'quote';
  data: any;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data }: EmailRequest = await req.json();

    let subject = "";
    let htmlContent = "";
    let toEmail = type === 'quote' ? data.email : "i.chaigari@heaventagency.com"; // Envoyer le devis au client

    switch (type) {
      case 'contact':
        subject = `Nouveau message de contact - ${data.name}`;
        htmlContent = `
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Sujet:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
        `;
        break;

      case 'wedding':
        subject = `Nouvelle demande de devis mariage - ${data.brideName} & ${data.groomName}`;
        htmlContent = `
          <h2>Nouvelle demande de devis mariage</h2>
          <p><strong>Mariés:</strong> ${data.brideName} & ${data.groomName}</p>
          <p><strong>Email:</strong> ${data.contactEmail}</p>
          <p><strong>Téléphone:</strong> ${data.contactPhone || 'Non renseigné'}</p>
          <p><strong>Date du mariage:</strong> ${data.weddingDate || 'Non renseignée'}</p>
          <p><strong>Lieu principal:</strong> ${data.weddingLocation || 'Non renseigné'}</p>
          <p><strong>Lieu de cérémonie:</strong> ${data.ceremonyLocation || 'Non précisé'}</p>
          <p><strong>Lieu de réception:</strong> ${data.receptionLocation || 'Non précisé'}</p>
          <p><strong>Nombre d'invités:</strong> ${data.guestCount || 'Non renseigné'}</p>
          <p><strong>Budget estimé:</strong> ${data.budget || 'Non renseigné'}</p>
          <p><strong>Services demandés:</strong> ${data.services ? data.services.join(', ') : 'Aucun'}</p>
          <p><strong>Demandes spéciales:</strong> ${data.specialRequests || 'Aucune'}</p>
        `;

        // Sauvegarder dans la base de données
        const { error: dbErrorWedding } = await supabase
          .from('devis_mariage')
          .insert({
            nom: data.brideName,
            prenom: data.groomName,
            email: data.contactEmail,
            telephone: data.contactPhone,
            date_mariage: data.weddingDate,
            lieu: data.weddingLocation || data.ceremonyLocation || data.receptionLocation,
            nb_invites: data.guestCount ? parseInt(data.guestCount) : null,
            services: data.services ? data.services.join(', ') : null,
            remarques: data.specialRequests
          });

        if (dbErrorWedding) {
          console.error("Erreur lors de la sauvegarde du devis mariage:", dbErrorWedding);
          throw new Error("Erreur lors de la sauvegarde en base de données");
        }
        
        break;

      case 'quote':
        subject = `Devis ${data.type === 'entreprise' ? 'Entreprise' : 'Mariage'} - Heaven T'Agency`;
        
        // Template d'email professionnel avec logo et signature
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Devis Heaven T'Agency</title>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
              .container { max-width: 800px; margin: 0 auto; background-color: white; }
              .header { background: linear-gradient(135deg, #1e293b, #334155); color: white; padding: 30px; text-align: center; }
              .logo { width: 120px; height: auto; margin-bottom: 15px; }
              .content { padding: 40px; }
              .section { margin-bottom: 30px; }
              .section-title { color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 15px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
              .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
              .info-item { background-color: #f8fafc; padding: 12px; border-radius: 8px; }
              .info-label { font-weight: 600; color: #475569; font-size: 14px; }
              .info-value { color: #1e293b; font-size: 16px; }
              .tarifs-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              .tarifs-table th, .tarifs-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
              .tarifs-table th { background-color: #f1f5f9; font-weight: 600; color: #1e293b; }
              .total-row { background-color: #1e293b; color: white; font-weight: 600; font-size: 18px; }
              .footer { background-color: #1e293b; color: white; padding: 30px; text-align: center; }
              .signature { margin-top: 20px; padding: 20px; background-color: #f8fafc; border-radius: 8px; text-align: center; }
              .ceo-name { font-size: 18px; font-weight: 600; color: #1e293b; margin-bottom: 5px; }
              .ceo-title { color: #64748b; margin-bottom: 15px; }
              .contact-info { font-size: 14px; color: #475569; }
            </style>
          </head>
          <body>
            <div class="container">
              <!-- Header -->
              <div class="header">
                <h1 style="margin: 0; font-size: 32px; font-weight: bold;">HEAVENT AGENCY</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Votre partenaire événementiel de confiance</p>
              </div>

              <!-- Content -->
              <div class="content">
                <div class="section">
                  <h2 style="color: #1e293b; margin-bottom: 20px;">Devis ${data.type === 'entreprise' ? 'Entreprise' : 'Mariage'}</h2>
                  <p>Madame, Monsieur <strong>${data.prenom} ${data.nom}</strong>,</p>
                  <p>Nous vous remercions pour votre confiance. Veuillez trouver ci-dessous notre proposition tarifaire détaillée :</p>
                </div>

                <!-- Informations client -->
                <div class="section">
                  <div class="section-title">Informations client</div>
                  <div class="info-grid">
                    <div class="info-item">
                      <div class="info-label">Contact</div>
                      <div class="info-value">${data.prenom} ${data.nom}</div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">Email</div>
                      <div class="info-value">${data.email}</div>
                    </div>
                    ${data.entreprise ? `
                    <div class="info-item">
                      <div class="info-label">Entreprise</div>
                      <div class="info-value">${data.entreprise}</div>
                    </div>
                    ` : ''}
                    ${data.telephone ? `
                    <div class="info-item">
                      <div class="info-label">Téléphone</div>
                      <div class="info-value">${data.telephone}</div>
                    </div>
                    ` : ''}
                  </div>
                </div>

                <!-- Détails événement -->
                <div class="section">
                  <div class="section-title">Détails de l'événement</div>
                  <div class="info-grid">
                    ${data.date_evenement ? `
                    <div class="info-item">
                      <div class="info-label">Date</div>
                      <div class="info-value">${new Date(data.date_evenement).toLocaleDateString('fr-FR')}</div>
                    </div>
                    ` : ''}
                    ${data.lieu ? `
                    <div class="info-item">
                      <div class="info-label">Lieu</div>
                      <div class="info-value">${data.lieu}</div>
                    </div>
                    ` : ''}
                    ${data.nb_personnes ? `
                    <div class="info-item">
                      <div class="info-label">${data.type === 'entreprise' ? 'Nb. personnes' : 'Nb. invités'}</div>
                      <div class="info-value">${data.nb_personnes}</div>
                    </div>
                    ` : ''}
                    ${data.nb_staff ? `
                    <div class="info-item">
                      <div class="info-label">Staff requis</div>
                      <div class="info-value">${data.nb_staff}</div>
                    </div>
                    ` : ''}
                  </div>
                </div>

                <!-- Tarifs -->
                <div class="section">
                  <div class="section-title">Détail des prestations</div>
                  <table class="tarifs-table">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th style="text-align: right; width: 150px;">Prix TTC</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${data.tarifs.map(tarif => `
                        <tr>
                          <td>${tarif.description}</td>
                          <td style="text-align: right;">${parseFloat(tarif.prix || 0).toFixed(2)} MAD</td>
                        </tr>
                      `).join('')}
                      <tr class="total-row">
                        <td><strong>TOTAL TTC</strong></td>
                        <td style="text-align: right;"><strong>${data.total.toFixed(2)} MAD</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                ${data.services ? `
                <div class="section">
                  <div class="section-title">Services inclus</div>
                  <p>${data.services}</p>
                </div>
                ` : ''}

                ${data.remarques ? `
                <div class="section">
                  <div class="section-title">Remarques</div>
                  <p>${data.remarques}</p>
                </div>
                ` : ''}

                <div class="section">
                  <p><strong>Conditions :</strong></p>
                  <ul>
                    <li>Devis valable 30 jours</li>
                    <li>Acompte de 50% à la signature</li>
                    <li>Solde à régler 7 jours avant l'événement</li>
                  </ul>
                </div>

                <!-- Signature -->
                <div class="signature">
                  <div class="ceo-name">Imane CHAIGARI</div>
                  <div class="ceo-title">CEO - HEAVENT AGENCY</div>
                  <div class="contact-info">
                    <div>📞 +212 610 93 96 55</div>
                    <div>✉️ i.chaigari@heaventagency.com</div>
                    <div>🌐 www.heaventagency.com</div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="footer">
                <p style="margin: 0;">HEAVENT AGENCY - Votre événement, notre passion</p>
                <p style="margin: 5px 0 0 0; opacity: 0.8; font-size: 14px;">Casablanca, Maroc</p>
              </div>
            </div>
          </body>
          </html>
        `;
        break;

      case 'business':
        subject = `Nouvelle demande de devis entreprise - ${data.companyName}`;
        htmlContent = `
          <h2>Nouvelle demande de devis entreprise</h2>
          <p><strong>Entreprise:</strong> ${data.companyName}</p>
          <p><strong>Contact:</strong> ${data.contactName}</p>
          <p><strong>Email:</strong> ${data.contactEmail}</p>
          <p><strong>Téléphone:</strong> ${data.contactPhone || 'Non renseigné'}</p>
          <p><strong>Secteur:</strong> ${data.sector || 'Non renseigné'}</p>
          <p><strong>Type d'événement:</strong> ${data.eventType || 'Non renseigné'}</p>
          <p><strong>Date:</strong> ${data.eventDate || 'Non renseignée'}</p>
          <p><strong>Lieu:</strong> ${data.eventLocation || 'Non renseigné'}</p>
          <p><strong>Nombre de personnes:</strong> ${data.staffCount || 'Non renseigné'}</p>
          <p><strong>Budget estimé:</strong> ${data.budget || 'Non renseigné'}</p>
          <p><strong>Critères spécifiques:</strong> ${data.requirements || 'Aucun'}</p>
          <p><strong>Commentaires:</strong> ${data.comments || 'Aucun'}</p>
        `;

        // Sauvegarder dans la base de données
        const { error: dbError } = await supabase
          .from('devis_entreprise')
          .insert({
            entreprise: data.companyName,
            nom: data.contactName.split(' ')[1] || data.contactName,
            prenom: data.contactName.split(' ')[0] || '',
            email: data.contactEmail,
            telephone: data.contactPhone,
            date_evenement: data.eventDate,
            lieu: data.eventLocation,
            nb_personnes: data.staffCount ? parseInt(data.staffCount) : null,
            nb_staff: data.staffCount ? parseInt(data.staffCount) : null,
            services: data.eventType,
            remarques: data.comments || data.requirements
          });

        if (dbError) {
          console.error("Erreur lors de la sauvegarde du devis entreprise:", dbError);
          throw new Error("Erreur lors de la sauvegarde en base de données");
        }
        
        break;

      case 'staff':
        subject = `Nouvelle candidature staff - ${data.nom} ${data.prenom}`;
        htmlContent = `
          <h2>Nouvelle candidature staff</h2>
          <p><strong>Nom:</strong> ${data.nom} ${data.prenom}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Téléphone:</strong> ${data.telephone || 'Non renseigné'}</p>
          <p><strong>Âge:</strong> ${data.age || 'Non renseigné'}</p>
          <p><strong>Genre:</strong> ${data.genre || 'Non renseigné'}</p>
          <p><strong>Ville:</strong> ${data.ville || 'Non renseignée'}</p>
          <p><strong>Taille:</strong> ${data.taille || 'Non renseignée'} cm</p>
          <p><strong>Permis de conduire:</strong> ${data.permis ? 'Oui' : 'Non'}</p>
          <p><strong>Expérience:</strong> ${data.experience || 'Non renseignée'}</p>
          <p><strong>Disponibilités:</strong> ${data.disponibilites ? data.disponibilites.join(', ') : 'Aucune'}</p>
        `;
        break;

      default:
        throw new Error('Type d\'email non reconnu');
    }

    const emailResponse = await resend.emails.send({
      from: "Heaven T'Agency <noreply@heaventagency.com>",
      to: [toEmail],
      subject: subject,
      html: htmlContent,
    });

    console.log("Email envoyé avec succès:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Erreur lors de l'envoi de l'email:", error);
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