/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("../src/generated/prisma");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createAdminUser() {
    try {
        console.log("🔄 Creando usuario administrador...");

        // Credenciales del administrador
        const adminEmail = process.env.ADMIN_EMAIL || "admin@cvitapilot.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "cvitapilot2024";
        const adminName = process.env.ADMIN_NAME || "Administrador CVitaPilot";

        // Verificar si ya existe un usuario administrador
        const existingUser = await prisma.user.findUnique({
            where: { email: adminEmail },
        });

        if (existingUser) {
            console.log("⚠️  El usuario administrador ya existe:", adminEmail);

            // Actualizar contraseña si es diferente
            const hashedPassword = await bcrypt.hash(adminPassword, 12);
            await prisma.user.update({
                where: { email: adminEmail },
                data: {
                    password: hashedPassword,
                    name: adminName,
                },
            });

            console.log("✅ Contraseña del administrador actualizada");
            return;
        }

        // Crear hash de la contraseña
        const hashedPassword = await bcrypt.hash(adminPassword, 12);

        // Crear usuario administrador
        const adminUser = await prisma.user.create({
            data: {
                email: adminEmail,
                name: adminName,
                password: hashedPassword,
                emailVerified: new Date(), // Marcar como verificado
            },
        });

        console.log("✅ Usuario administrador creado exitosamente:");
        console.log("📧 Email:", adminEmail);
        console.log("👤 Nombre:", adminName);
        console.log("🔑 Contraseña:", adminPassword);
        console.log("🆔 ID:", adminUser.id);
        console.log("");
        console.log("🚀 Ya puedes iniciar sesión en la aplicación!");
        console.log("🌐 URL: http://localhost:3000/auth/login");

    } catch (error) {
        console.error("❌ Error al crear usuario administrador:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

// Ejecutar script
createAdminUser(); 