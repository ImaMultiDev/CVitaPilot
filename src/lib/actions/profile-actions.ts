"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

// Subir foto de perfil
export async function uploadProfileImage(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    const file = formData.get("image") as File;
    if (!file) {
      return { success: false, error: "No se proporcionó ninguna imagen" };
    }

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      return { success: false, error: "Solo se permiten archivos de imagen" };
    }

    // Validar tamaño (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: "La imagen no puede superar los 5MB" };
    }

    // Convertir archivo a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Subir a Cloudinary
    const uploadResult = await uploadImage(buffer, {
      folder: "profileImage",
      transformation: [
        { width: 400, height: 400, crop: "fill", gravity: "face" },
        { quality: "auto:good" },
      ],
    });

    if (!uploadResult.success) {
      return { success: false, error: uploadResult.error };
    }

    // Obtener usuario actual
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { success: false, error: "Usuario no encontrado" };
    }

    // Si ya tiene una foto, eliminar la anterior
    if (user.image) {
      // Extraer public_id de la URL anterior si existe
      const urlParts = user.image.split("/");
      const publicId = urlParts[urlParts.length - 1].split(".")[0];
      if (publicId) {
        await deleteImage(`profileImage/${publicId}`);
      }
    }

    // Actualizar usuario con nueva imagen
    await prisma.user.update({
      where: { email: session.user.email },
      data: { image: uploadResult.url },
    });

    revalidatePath("/settings");
    revalidatePath("/");

    return {
      success: true,
      url: uploadResult.url,
      message: "Foto de perfil actualizada correctamente",
    };
  } catch (error) {
    console.error("Error uploading profile image:", error);
    return {
      success: false,
      error: "Error al subir la imagen. Inténtalo de nuevo.",
    };
  }
}

// Eliminar foto de perfil
export async function deleteProfileImage() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { success: false, error: "Usuario no encontrado" };
    }

    if (!user.image) {
      return { success: false, error: "No hay foto de perfil para eliminar" };
    }

    // Eliminar de Cloudinary
    const urlParts = user.image.split("/");
    const publicId = urlParts[urlParts.length - 1].split(".")[0];
    if (publicId) {
      await deleteImage(`profileImage/${publicId}`);
    }

    // Actualizar usuario
    await prisma.user.update({
      where: { email: session.user.email },
      data: { image: null },
    });

    revalidatePath("/settings");
    revalidatePath("/");

    return {
      success: true,
      message: "Foto de perfil eliminada correctamente",
    };
  } catch (error) {
    console.error("Error deleting profile image:", error);
    return {
      success: false,
      error: "Error al eliminar la imagen. Inténtalo de nuevo.",
    };
  }
}

// Actualizar información del perfil
export async function updateProfileInfo(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    if (!name || !email) {
      return { success: false, error: "Nombre y email son requeridos" };
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "Email inválido" };
    }

    // Verificar si el email ya existe (si es diferente al actual)
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return { success: false, error: "Usuario no encontrado" };
    }

    if (email !== currentUser.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return { success: false, error: "Este email ya está en uso" };
      }
    }

    // Actualizar usuario
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        email,
        emailVerified:
          email !== currentUser.email ? null : currentUser.emailVerified,
      },
    });

    revalidatePath("/settings");

    return {
      success: true,
      message: "Información del perfil actualizada correctamente",
      requiresEmailVerification: email !== currentUser.email,
    };
  } catch (error) {
    console.error("Error updating profile info:", error);
    return {
      success: false,
      error: "Error al actualizar la información. Inténtalo de nuevo.",
    };
  }
}
