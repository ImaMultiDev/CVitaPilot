// Función para convertir imagen de URL a base64
export const convertImageToBase64 = async (
  imageUrl: string
): Promise<string> => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert image to base64"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error converting image to base64:", error);
    throw error;
  }
};

// Función para verificar si una URL es de Cloudinary
export const isCloudinaryUrl = (url: string): boolean => {
  return url.includes("res.cloudinary.com");
};

// Función para obtener la imagen optimizada para PDF
export const getImageForPDF = async (
  imageUrl: string | null | undefined
): Promise<string | null> => {
  if (!imageUrl) return null;

  try {
    // Si es una URL de Cloudinary, convertir a base64
    if (isCloudinaryUrl(imageUrl)) {
      return await convertImageToBase64(imageUrl);
    }

    // Si ya es base64, devolver directamente
    if (imageUrl.startsWith("data:image/")) {
      return imageUrl;
    }

    // Para otras URLs, intentar convertir
    return await convertImageToBase64(imageUrl);
  } catch (error) {
    console.error("Error getting image for PDF:", error);
    return null;
  }
};
