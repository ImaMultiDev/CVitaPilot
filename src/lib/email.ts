// Configuración para envío de emails
// Recomendamos usar Resend (https://resend.com) por su facilidad de uso y buen plan gratuito

import { Resend } from "resend";

// Inicializar Resend (requiere RESEND_API_KEY en variables de entorno)
const resend = new Resend(process.env.RESEND_API_KEY);

// Plantilla de email de verificación
export const verificationEmailTemplate = (
  verificationUrl: string,
  userName: string
) => ({
  from: "CVitaPilot <noreply@cvitapilot.com>",
  to: [userName],
  subject: "Verifica tu cuenta de CVitaPilot",
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verifica tu cuenta de CVitaPilot</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .logo { width: 60px; height: 60px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://cvitapilot.com/logo_128x128.png" alt="CVitaPilot" class="logo">
          <h1>¡Bienvenido a CVitaPilot!</h1>
          <p>Tu generador profesional de CVs</p>
        </div>
        <div class="content">
          <h2>Verifica tu cuenta</h2>
          <p>Hola,</p>
          <p>Gracias por registrarte en CVitaPilot. Para completar tu registro y acceder a todas las funcionalidades, necesitamos verificar tu dirección de email.</p>
          <p>Haz clic en el botón de abajo para verificar tu cuenta:</p>
          <div style="text-align: center;">
            <a href="${verificationUrl}" class="button">Verificar mi cuenta</a>
          </div>
          <p>Si el botón no funciona, puedes copiar y pegar este enlace en tu navegador:</p>
          <p style="word-break: break-all; color: #667eea;">${verificationUrl}</p>
          <p><strong>Importante:</strong> Este enlace expirará en 24 horas por seguridad.</p>
          <p>Si no solicitaste esta verificación, puedes ignorar este email.</p>
        </div>
        <div class="footer">
          <p>© 2024 CVitaPilot. Todos los derechos reservados.</p>
          <p>Este es un email automático, por favor no respondas a este mensaje.</p>
        </div>
      </div>
    </body>
    </html>
  `,
});

// Función para enviar email de verificación usando Resend
export async function sendVerificationEmailResend(
  email: string,
  token: string
): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn(
        "RESEND_API_KEY no configurada. Simulando envío de email..."
      );
      console.log(`Email de verificación enviado a ${email}`);
      console.log(
        `URL de verificación: ${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`
      );
      return true;
    }

    const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;
    const emailData = verificationEmailTemplate(verificationUrl, email);

    const result = await resend.emails.send({
      from: emailData.from,
      to: [email],
      subject: emailData.subject,
      html: emailData.html,
    });

    console.log("Email enviado exitosamente:", result);
    return true;
  } catch (error) {
    console.error("Error enviando email con Resend:", error);
    return false;
  }
}

// Función para enviar email usando otros servicios (alternativas)
export async function sendVerificationEmailNodemailer(
  email: string,
  token: string
): Promise<boolean> {
  try {
    // Implementación con Nodemailer (requiere configuración SMTP)
    // const nodemailer = require('nodemailer');
    // const transporter = nodemailer.createTransporter({
    //   host: process.env.SMTP_HOST,
    //   port: process.env.SMTP_PORT,
    //   secure: true,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // });

    console.warn("Nodemailer no implementado. Simulando envío...");
    console.log(`Email de verificación enviado a ${email}`);
    console.log(
      `URL de verificación: ${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`
    );
    return true;
  } catch (error) {
    console.error("Error enviando email con Nodemailer:", error);
    return false;
  }
}

// Función principal que usa el servicio configurado
export async function sendVerificationEmail(
  email: string,
  token: string
): Promise<boolean> {
  // Usar Resend si está configurado, sino simular
  if (process.env.RESEND_API_KEY) {
    return await sendVerificationEmailResend(email, token);
  } else {
    // Simulación para desarrollo
    console.warn("RESEND_API_KEY no configurada. Simulando envío...");
    console.log(`Email de verificación enviado a ${email}`);
    console.log(
      `URL de verificación: ${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`
    );
    return true;
  }
}
