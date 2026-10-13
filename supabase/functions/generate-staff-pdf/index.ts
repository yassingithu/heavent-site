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

const generatePrintableHTML = (staffData: any) => {
  // Utiliser l'URL de photo pré-calculée
  const photoUrl = staffData.photoUrl;

  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Fiche Personnel - ${staffData.prenom} ${staffData.nom}</title>
    <style>
        @page {
            size: A4;
            margin: 0.8cm;
        }
        @media print {
            body { -webkit-print-color-adjust: exact; color-adjust: exact; }
            .no-print { display: none !important; }
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Arial', sans-serif;
            color: #333;
            line-height: 1.2;
            background: white;
            font-size: 11px;
        }
        .container {
            max-width: 21cm;
            margin: 0 auto;
            background: white;
            padding: 0.5cm;
            height: 28.7cm;
            overflow: hidden;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 8px;
            margin-bottom: 12px;
        }
        .logo {
            font-size: 14px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 4px;
        }
        .title {
            font-size: 16px;
            font-weight: bold;
            color: #1e40af;
            margin: 0;
        }
        .profile-section {
            display: flex;
            gap: 15px;
            margin-bottom: 15px;
            align-items: flex-start;
        }
        .photo-container {
            flex: 0 0 100px;
            text-align: center;
        }
        .photo {
            width: 100px;
            height: 120px;
            object-fit: cover;
            border-radius: 4px;
            border: 1px solid #e5e7eb;
            display: block;
        }
        .photo-placeholder {
            width: 100px;
            height: 120px;
            border: 1px dashed #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            border-radius: 4px;
            background: #f9fafb;
            font-size: 9px;
            text-align: center;
        }
        .personal-info {
            flex: 1;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
            margin-bottom: 8px;
        }
        .info-item {
            padding: 6px;
            background: #f8fafc;
            border-left: 2px solid #2563eb;
            border-radius: 3px;
        }
        .info-label {
            font-weight: bold;
            color: #374151;
            font-size: 9px;
            margin-bottom: 2px;
        }
        .info-value {
            color: #1f2937;
            font-size: 10px;
        }
        .section {
            margin-bottom: 12px;
            padding: 8px;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
            background: white;
        }
        .section-title {
            font-size: 12px;
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 6px;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 3px;
        }
        .measurements {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-left: 2px solid #0284c7;
        }
        .measurements-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 4px;
            margin-top: 4px;
        }
        .measurement-item {
            text-align: center;
            padding: 3px;
            background: white;
            border-radius: 3px;
            border: 1px solid #cbd5e1;
        }
        .measurement-label {
            font-size: 7px;
            color: #64748b;
            font-weight: 600;
            text-transform: uppercase;
            margin-bottom: 1px;
        }
        .measurement-value {
            font-size: 9px;
            font-weight: bold;
            color: #0f172a;
        }
        .experience-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        .experience-item {
            margin-bottom: 8px;
        }
        .experience-item p {
            font-size: 9px;
            margin-bottom: 4px;
        }
        .footer {
            margin-top: 15px;
            text-align: center;
            font-size: 8px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
            padding-top: 8px;
        }
        .print-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2563eb;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }
        .print-button:hover {
            background: #1d4ed8;
        }
        .instructions {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 6px;
            padding: 15px;
            margin: 20px;
            text-align: center;
        }
        .instructions h3 {
            color: #92400e;
            margin-bottom: 8px;
        }
        .instructions p {
            color: #451a03;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="instructions no-print">
        <h3>📄 Instructions pour générer le PDF</h3>
        <p>Cliquez sur le bouton "Imprimer en PDF" ou utilisez <strong>Ctrl+P</strong> puis sélectionnez "Enregistrer au format PDF"</p>
    </div>

    <button onclick="window.print()" class="print-button no-print">🖨️ Imprimer en PDF</button>

    <div class="container">
        <div class="header">
            <div class="logo">HEAVENT PEOPLE AGENCY</div>
            <h1 class="title">FICHE PERSONNEL</h1>
        </div>

        <div class="profile-section">
            <div class="photo-container">
                ${photoUrl ? 
                    `<img src="${photoUrl}" alt="Photo ${staffData.prenom}" class="photo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                     <div class="photo-placeholder" style="display:none;">Photo<br>non disponible</div>` :
                    `<div class="photo-placeholder">Photo<br>non disponible</div>`
                }
            </div>
            
            <div class="personal-info">
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Nom complet</div>
                        <div class="info-value">${staffData.prenom} ${staffData.nom}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Email</div>
                        <div class="info-value">${staffData.email}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Téléphone</div>
                        <div class="info-value">${staffData.telephone || 'Non renseigné'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Âge</div>
                        <div class="info-value">${staffData.age || 'Non renseigné'} ans</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Ville</div>
                        <div class="info-value">${staffData.ville || 'Non renseigné'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Genre</div>
                        <div class="info-value">${staffData.genre || 'Non renseigné'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Permis de conduire</div>
                        <div class="info-value">${staffData.permis ? '✅ Oui' : '❌ Non'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Date d'inscription</div>
                        <div class="info-value">${staffData.created_at ? new Date(staffData.created_at).toLocaleDateString('fr-FR') : 'Non renseigné'}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section measurements">
            <h3 class="section-title">📏 Mensurations & Tailles</h3>
            <div class="measurements-grid">
                <div class="measurement-item">
                    <div class="measurement-label">Taille</div>
                    <div class="measurement-value">${staffData.taille || '?'} cm</div>
                </div>
                <div class="measurement-item">
                    <div class="measurement-label">Taille pantalon</div>
                    <div class="measurement-value">${staffData.taille_pantalon || 'Non renseigné'}</div>
                </div>
                <div class="measurement-item">
                    <div class="measurement-label">Taille haut</div>
                    <div class="measurement-value">${staffData.taille_haut || 'Non renseigné'}</div>
                </div>
                <div class="measurement-item">
                    <div class="measurement-label">Pointure</div>
                    <div class="measurement-value">${staffData.pointure || 'Non renseigné'}</div>
                </div>
                <div class="measurement-item">
                    <div class="measurement-label">Couleur cheveux</div>
                    <div class="measurement-value">${staffData.couleur_cheveux || 'Non renseigné'}</div>
                </div>
                <div class="measurement-item">
                    <div class="measurement-label">Couleur yeux</div>
                    <div class="measurement-value">${staffData.couleur_yeux || 'Non renseigné'}</div>
                </div>
            </div>
        </div>

        <div class="section">
            <h3 class="section-title">💼 Expérience & Compétences</h3>
            <div class="experience-section">
                <div class="experience-item">
                    <p><strong>Expérience :</strong></p>
                    <p>${staffData.experience || 'Non renseignée'}</p>
                </div>
                <div class="experience-item">
                    <p><strong>Compétences :</strong></p>
                    <p>${staffData.competences || 'Non renseignées'}</p>
                </div>
            </div>
        </div>

        <div class="section">
            <h3 class="section-title">🌍 Langues & Disponibilités</h3>
            <div class="experience-section">
                <div class="experience-item">
                    <p><strong>Langues :</strong></p>
                    <p>${staffData.langues || 'Non renseignées'}</p>
                </div>
                <div class="experience-item">
                    <p><strong>Disponibilités :</strong></p>
                    <p>${staffData.disponibilites || 'Non renseignées'}</p>
                </div>
            </div>
        </div>

        <div class="footer">
            <p><strong>Heavent People Agency</strong> - Fiche générée le ${new Date().toLocaleDateString('fr-FR')}</p>
            <p>Document confidentiel - Usage interne uniquement</p>
        </div>
    </div>

    <script>
        // Auto-focus sur l'impression après 1 seconde
        setTimeout(() => {
            console.log('⏰ Auto-ouverture de l\'impression dans 3 secondes...');
            setTimeout(() => {
                window.print();
            }, 3000);
        }, 1000);

        // Message dans la console
        console.log('📄 Fiche staff générée pour: ${staffData.prenom} ${staffData.nom}');
        console.log('🖼️ Photo URL: ${photoUrl || "Aucune photo"}');
    </script>
</body>
</html>`;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { staff_id } = await req.json();

    if (!staff_id) {
      return new Response(
        JSON.stringify({ error: "ID du staff requis" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("🔍 Recherche staff avec ID:", staff_id);

    // Récupérer les données du staff
    const { data: staffData, error } = await supabase
      .from('staff')
      .select('*')
      .eq('id', staff_id)
      .single();

    if (error || !staffData) {
      console.error("❌ Erreur récupération staff:", error);
      return new Response(
        JSON.stringify({ error: "Staff non trouvé" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("✅ Staff trouvé:", staffData.prenom, staffData.nom);
    console.log("🖼️ Chemin photo brut:", staffData.photo);
    
    // Test direct de l'URL
    const testUrl = `https://dlxaqkaivjkxtqyxswls.supabase.co/storage/v1/object/public/photos/${staffData.photo}`;
    console.log("🔗 URL photo test:", testUrl);
    
    // Construire l'URL de la photo CORRECTE
    let photoUrl = null;
    if (staffData.photo) {
      // URL directe vers le storage Supabase
      photoUrl = `https://dlxaqkaivjkxtqyxswls.supabase.co/storage/v1/object/public/photos/photos/${staffData.photo}`;
    }
    
    console.log("🔗 URL photo finale:", photoUrl);

    // Générer le HTML avec l'URL de photo calculée
    const htmlContent = generatePrintableHTML({...staffData, photoUrl});

    // Retourner directement le HTML avec auto-impression
    return new Response(htmlContent, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `inline; filename="fiche-${staffData.prenom}-${staffData.nom}.html"`,
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("💥 Erreur fonction generate-staff-pdf:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);