/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

async function migrateCVsToAdmin() {
    try {
        console.log("🔄 Migrando CVs existentes al usuario administrador...");

        // Buscar el usuario administrador
        const adminUser = await prisma.user.findUnique({
            where: { email: "admin@cvitapilot.com" },
        });

        if (!adminUser) {
            console.error("❌ Usuario administrador no encontrado. Ejecuta primero 'npm run auth:create-admin'");
            process.exit(1);
        }

        console.log("👤 Usuario administrador encontrado:", adminUser.name);

        // Actualizar todos los CVs para asociarlos con el administrador
        const updateResult = await prisma.cV.updateMany({
            data: {
                userId: adminUser.id,
            },
        });

        console.log(`✅ ${updateResult.count} CVs migrados exitosamente al usuario administrador`);

        console.log("🎉 Migración completada. Ahora puedes aplicar el schema completo:");
        console.log("💡 Ejecuta: npx prisma db push");

    } catch (error) {
        console.error("❌ Error durante la migración:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

// Ejecutar migración
migrateCVsToAdmin(); 