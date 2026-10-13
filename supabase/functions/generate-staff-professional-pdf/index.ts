import { getCaller, deny } from "../_shared/auth.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

function generateStaffHTML(staffData: any): string {
  const languages = [
    { name: 'Français/Frans', level: staffData.langues?.includes('français') ? 'X' : '' },
    { name: 'Néerlandais/Nederlands', level: staffData.langues?.includes('néerlandais') ? 'X' : '' },
    { name: 'Anglais/Engels', level: staffData.langues?.includes('anglais') ? 'X' : '' },
    { name: 'Allemand/Duits', level: staffData.langues?.includes('allemand') ? 'X' : '' },
    { name: 'Espagnol/Spaans', level: staffData.langues?.includes('espagnol') ? 'X' : '' },
    { name: 'Italien/Italiaans', level: staffData.langues?.includes('italien') ? 'X' : '' },
    { name: 'Arabe/Arabisch', level: staffData.langues?.includes('arabe') ? 'X' : '' },
    { name: 'Turc/Turks', level: staffData.langues?.includes('turc') ? 'X' : '' },
    { name: 'Marocain/Marokkaans', level: staffData.langues?.includes('marocain') ? 'X' : '' }
  ];

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fiche Casting - ${staffData.prenom} ${staffData.nom}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: Arial, sans-serif;
                background: white;
                color: #333;
                line-height: 1.4;
                padding: 20px;
            }
            
            .container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
                border-radius: 8px;
                overflow: hidden;
            }
            
            .header {
                background: linear-gradient(135deg, #1e3a8a, #3b82f6);
                color: white;
                padding: 30px;
                text-align: center;
                position: relative;
            }
            
            .logo {
                position: absolute;
                top: 20px;
                left: 30px;
                font-size: 14px;
                font-weight: bold;
            }
            
            .casting-title {
                position: absolute;
                top: 20px;
                right: 30px;
                font-size: 18px;
                font-weight: bold;
            }
            
            .staff-name {
                font-size: 36px;
                font-weight: bold;
                margin: 20px 0;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            
            .photos-section {
                display: flex;
                justify-content: center;
                gap: 20px;
                padding: 20px;
                background: #f8fafc;
            }
            
            .photo-container {
                flex: 1;
                max-width: 200px;
            }
            
            .photo {
                width: 100%;
                height: 250px;
                background: #e2e8f0;
                border: 2px solid #cbd5e1;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #64748b;
                font-size: 14px;
                text-align: center;
                object-fit: cover;
            }
            
            .photo img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 6px;
            }
            
            .info-section {
                padding: 30px;
            }
            
            .info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .info-item {
                background: #f1f5f9;
                padding: 15px;
                border-radius: 6px;
                border-left: 4px solid #3b82f6;
            }
            
            .info-label {
                font-weight: bold;
                color: #1e40af;
                margin-bottom: 5px;
                font-size: 14px;
            }
            
            .info-value {
                font-size: 16px;
                color: #334155;
            }
            
            .languages-section {
                margin: 30px 0;
            }
            
            .section-title {
                font-size: 20px;
                font-weight: bold;
                color: #1e40af;
                margin-bottom: 20px;
                text-align: center;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .languages-table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                border-radius: 8px;
                overflow: hidden;
            }
            
            .languages-table th,
            .languages-table td {
                padding: 12px;
                text-align: center;
                border: 1px solid #e2e8f0;
            }
            
            .languages-table th {
                background: #3b82f6;
                color: white;
                font-weight: bold;
                font-size: 12px;
                text-transform: uppercase;
            }
            
            .languages-table tr:nth-child(even) {
                background: #f8fafc;
            }
            
            .languages-table tr:hover {
                background: #e0f2fe;
            }
            
            .language-name {
                text-align: left;
                font-weight: 500;
            }
            
            .level-mark {
                font-size: 18px;
                font-weight: bold;
                color: #16a34a;
            }
            
            .remarks-section {
                margin: 30px 0;
                padding: 20px;
                background: #f8fafc;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
            }
            
            .remarks-content {
                min-height: 80px;
                padding: 10px;
                background: white;
                border: 1px solid #d1d5db;
                border-radius: 4px;
                margin-top: 10px;
            }
            
            .footer {
                background: #1e3a8a;
                color: white;
                padding: 20px;
                text-align: center;
                font-size: 12px;
            }
            
            .footer-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 20px;
            }
            
            .contact-info {
                text-align: left;
            }
            
            .website {
                text-align: right;
                font-weight: bold;
            }
            
            .gdpr-notice {
                margin-top: 15px;
                font-size: 10px;
                opacity: 0.8;
                line-height: 1.3;
            }
            
            @media print {
                body {
                    padding: 0;
                }
                .container {
                    box-shadow: none;
                    border-radius: 0;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div class="header">
                <div class="logo">Heavent People Agency</div>
                <div class="casting-title">Casting</div>
                <div class="staff-name">${staffData.prenom} ${staffData.nom}</div>
            </div>
            
            <!-- Photos -->
            <div class="photos-section">
                <div class="photo-container">
                    <div class="photo">
                        ${staffData.photo ? `<img src="${staffData.photo}" alt="Photo portrait" />` : 'Photo portrait<br>non disponible'}
                    </div>
                </div>
                <div class="photo-container">
                    <div class="photo">
                        ${staffData.photo_plein_pied ? `<img src="${staffData.photo_plein_pied}" alt="Photo plein pied" />` : 'Photo plein pied<br>non disponible'}
                    </div>
                </div>
            </div>
            
            <!-- Informations personnelles -->
            <div class="info-section">
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Prénom / Voornaam :</div>
                        <div class="info-value">${staffData.prenom}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Couleur de cheveux :</div>
                        <div class="info-value">${staffData.couleur_cheveux || 'Non spécifié'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Nom / Naam :</div>
                        <div class="info-value">${staffData.nom}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Couleur des yeux :</div>
                        <div class="info-value">${staffData.couleur_yeux || 'Non spécifié'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Date de naissance / Geboorte datum :</div>
                        <div class="info-value">${staffData.date_naissance || 'Non spécifié'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Taille pantalon :</div>
                        <div class="info-value">${staffData.taille_pantalon || 'Non spécifié'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Taille / Lengte (cm) :</div>
                        <div class="info-value">${staffData.taille || 'Non spécifié'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Taille haut :</div>
                        <div class="info-value">${staffData.taille_haut || 'Non spécifié'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Pointure / Schoenmaat :</div>
                        <div class="info-value">${staffData.pointure || 'Non spécifié'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Voiture / Wagen :</div>
                        <div class="info-value">${staffData.permis ? 'oui / ja' : 'non / nee'}</div>
                    </div>
                </div>
                
                <!-- Tableau des langues -->
                <div class="languages-section">
                    <div class="section-title">Langues / Talen</div>
                    <table class="languages-table">
                        <thead>
                            <tr>
                                <th style="text-align: left;">Langues<br>Talen</th>
                                <th>Néant<br>Nihil</th>
                                <th>Faible<br>Zwak</th>
                                <th>Bien<br>Goed</th>
                                <th>Très bien<br>Zeer Goed</th>
                                <th>Excellent<br>Perfect</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${languages.map(lang => `
                                <tr>
                                    <td class="language-name">${lang.name}</td>
                                    <td></td>
                                    <td></td>
                                    <td>${lang.level === 'X' ? '<span class="level-mark">X</span>' : ''}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <!-- Remarques -->
                <div class="remarks-section">
                    <div class="section-title">Remarques / Opmerkingen :</div>
                    <div class="remarks-content">
                        ${staffData.remarques || staffData.experience || 'Aucune remarque particulière'}
                    </div>
                </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
                <div class="footer-info">
                    <div class="contact-info">
                        <div><strong>Heavent People Agency</strong></div>
                        <div>Rabat, Maroc</div>
                        <div>+212 6 10 93 96 55</div>
                        <div>info@heaventagency.com</div>
                    </div>
                    <div class="website">
                        <div>www.heaventagency.com</div>
                        <div>i.chaigari@heaventagency.com</div>
                    </div>
                </div>
                <div class="gdpr-notice">
                    La loi du 25/05/2018 (RGPD) nous oblige à vous informer que, tout document qui vous a été envoyé et qui contient des données personnelles, doit être supprimé endéans les 5 jours suivant l'événement.<br>
                    De wet van 25/05/2018 (GDPR) verplicht ons u te melden dat elk document dat u werd toegestuurd met inhoud van persoonsgegevens, binnen de 5 dagen na het event verwijderd moet worden.
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { staff_ids } = await req.json();
    const caller = await getCaller(req);
    if (!caller?.isAdmin) return deny();

    if (!staff_ids || !Array.isArray(staff_ids)) {
      return new Response(
        JSON.stringify({ error: 'staff_ids array is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Fetch staff data
    const { data: staffList, error: staffError } = await supabase
      .from('staff')
      .select('*')
      .in('id', staff_ids);

    if (staffError) {
      throw new Error(`Error fetching staff: ${staffError.message}`);
    }

    if (!staffList || staffList.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No staff found with provided IDs' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Generate HTML for multiple staff members
    const allStaffHTML = staffList.map(staff => generateStaffHTML(staff)).join('<div style="page-break-after: always;"></div>');

    return new Response(allStaffHTML, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="fiches-staff-${Date.now()}.html"`,
        ...corsHeaders,
      },
    });

  } catch (error) {
    console.error('Error in generate-staff-professional-pdf function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);