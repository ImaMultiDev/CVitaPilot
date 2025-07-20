"use server";

import { auth } from "@/auth";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SupportMessage {
  subject: string;
  category: string;
  message: string;
  priority: string;
}

export async function sendSupportMessage(data: SupportMessage) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Usuario no autenticado");
    }

    const userEmail = session.user.email;
    const userName = session.user.name || "Usuario";

    // Preparar el contenido del email
    const emailSubject = `[Soporte CVitaPilot] ${data.subject}`;

    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mensaje de Soporte CVitaPilot</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nuevo Mensaje de Soporte</h1>
            <p>CVitaPilot - Sistema de Soporte</p>
          </div>
          <div class="content">
            <h2>Información del Usuario</h2>
            <div class="info-box">
              <p><strong>Nombre:</strong> ${userName}</p>
              <p><strong>Email:</strong> ${userEmail}</p>
              <p><strong>Categoría:</strong> ${data.category}</p>
              <p><strong>Prioridad:</strong> ${data.priority}</p>
              <p><strong>Fecha:</strong> ${new Date().toLocaleString("es-ES")}</p>
            </div>
            
            <h2>Mensaje</h2>
            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea;">
              <p>${data.message.replace(/\n/g, "<br>")}</p>
            </div>
          </div>
          <div class="footer">
            <p>© 2024 CVitaPilot. Mensaje enviado desde el sistema de soporte.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Enviar email usando Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "CVitaPilot <noreply@cvitapilot.com>",
        to: ["contact@imamultidev.dev"],
        subject: emailSubject,
        html: emailContent,
      });
    } else {
      // Simulación para desarrollo
      console.warn(
        "RESEND_API_KEY no configurada. Simulando envío de email de soporte..."
      );
      console.log("Email de soporte enviado a: contact@imamultidev.dev");
      console.log("Asunto:", emailSubject);
      console.log("Contenido:", data.message);
    }

    return { success: true, message: "Mensaje enviado correctamente" };
  } catch (error) {
    console.error("Error enviando mensaje de soporte:", error);
    return {
      success: false,
      message: "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
    };
  }
}
