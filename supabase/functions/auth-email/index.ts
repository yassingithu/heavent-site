import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("📧 Webhook auth email reçu:", body);

    const { user, email_data } = body;
    
    if (!user?.email) {
      throw new Error("Email utilisateur manquant");
    }

    const { token_hash, token, redirect_to, email_action_type } = email_data;

    // Construire l'URL de confirmation
    const confirmationUrl = `${Deno.env.get("SUPABASE_URL")}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to || 'https://heaventagency.com/auth'}`;

    let subject = "";
    let htmlContent = "";

    switch (email_action_type) {
      case 'signup':
        subject = "Confirmez votre inscription - Heavent People Agency";
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmation d'inscription</title>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
              .container { max-width: 600px; margin: 0 auto; background-color: white; }
              .header { background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%); color: white; padding: 40px; text-align: center; }
              .logo { font-size: 24px; font-weight: bold; }
              .content { padding: 40px; }
              .button { display: inline-block; background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
              .footer { background-color: #f8fafc; padding: 20px; text-align: center; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">Heavent People Agency</div>
                <h1>Bienvenue !</h1>
              </div>
              
              <div class="content">
                <h2>Confirmez votre inscription</h2>
                <p>Bonjour,</p>
                <p>Merci de vous être inscrit(e) sur notre plateforme ! Pour finaliser votre inscription, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous. Vous serez ensuite redirigé vers la page de connexion où vous pourrez vous connecter avec vos identifiants :</p>
                
                <p style="text-align: center;">
                  <a href="${confirmationUrl}" class="button">Confirmer mon inscription</a>
                </p>
                
                <p>Si le bouton ne fonctionne pas, vous pouvez copier-coller ce lien dans votre navigateur :</p>
                <p style="word-break: break-all; background-color: #f8fafc; padding: 10px; border-radius: 4px; font-size: 12px;">
                  ${confirmationUrl}
                </p>
                
                <p><strong>Code de confirmation temporaire :</strong> <code style="background-color: #f8fafc; padding: 4px 8px; border-radius: 4px;">${token}</code></p>
                
                <p style="color: #666; font-size: 14px; margin-top: 30px;">
                  Ce lien expire dans 24 heures. Si vous n'avez pas demandé cette inscription, vous pouvez ignorer cet email.
                </p>
              </div>
              
              <div class="footer">
                <p>Heavent People Agency - Spécialisée dans l'événementiel</p>
                <p>📧 i.chaigari@heaventagency.com | 📞 +212 6 10 93 96 55</p>
              </div>
            </div>
          </body>
          </html>
        `;
        break;

      case 'recovery':
        subject = "Réinitialisation de votre mot de passe - Heavent People Agency";
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
              .container { max-width: 600px; margin: 0 auto; background-color: white; }
              .header { background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%); color: white; padding: 40px; text-align: center; }
              .content { padding: 40px; }
              .button { display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">Heavent People Agency</div>
                <h1>Réinitialisation de mot de passe</h1>
              </div>
              
              <div class="content">
                <h2>Demande de réinitialisation</h2>
                <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
                
                <p style="text-align: center;">
                  <a href="${confirmationUrl}" class="button">Réinitialiser mon mot de passe</a>
                </p>
                
                <p>Ce lien expire dans 1 heure. Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
              </div>
            </div>
          </body>
          </html>
        `;
        break;

      default:
        subject = "Action requise - Heavent People Agency";
        htmlContent = `
          <h2>Action requise</h2>
          <p>Veuillez cliquer sur le lien suivant :</p>
          <p><a href="${confirmationUrl}">Cliquez ici</a></p>
        `;
    }

    console.log("📤 Envoi email confirmation à:", user.email);

    const emailResponse = await resend.emails.send({
      from: "Heavent People Agency <noreply@heaventagency.com>",
      to: [user.email],
      subject: subject,
      html: htmlContent,
    });

    console.log("✅ Email envoyé:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      email_id: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("❌ Erreur envoi email auth:", error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json", 
        ...corsHeaders 
      },
    });
  }
};

serve(handler);