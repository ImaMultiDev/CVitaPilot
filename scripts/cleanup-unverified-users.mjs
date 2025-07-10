#!/usr/bin/env node

/**
 * Script para limpiar usuarios no verificados y tokens expirados
 * 
 * Uso:
 * - Manual: node scripts/cleanup-unverified-users.js
 * - Programado: Añadir a cron job para ejecutar cada hora
 * 
 * Ejemplo cron job (cada hora):
 * 0 * * * * cd /path/to/app && node scripts/cleanup-unverified-users.js
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupUnverifiedUsers() {
    try {
        console.log('🔄 Iniciando limpieza de usuarios no verificados...');

        const now = new Date();
        const maxAge = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
        const cutoffDate = new Date(now.getTime() - maxAge);

        // Eliminar tokens expirados
        const deletedTokens = await prisma.verificationToken.deleteMany({
            where: {
                expires: {
                    lt: now,
                },
            },
        });

        // Eliminar usuarios no verificados que se registraron hace más de 24 horas
        const deletedUsers = await prisma.user.deleteMany({
            where: {
                emailVerified: null,
                createdAt: {
                    lt: cutoffDate,
                },
                // Solo eliminar usuarios con contraseña (no OAuth)
                password: {
                    not: null,
                },
            },
        });

        // Obtener estadísticas actuales
        const [unverifiedUsers, expiredTokens] = await Promise.all([
            prisma.user.count({
                where: {
                    emailVerified: null,
                    createdAt: {
                        lt: cutoffDate,
                    },
                    password: {
                        not: null,
                    },
                },
            }),
            prisma.verificationToken.count({
                where: {
                    expires: {
                        lt: now,
                    },
                },
            }),
        ]);

        console.log('✅ Limpieza completada:');
        console.log(`   - Usuarios eliminados: ${deletedUsers.count}`);
        console.log(`   - Tokens eliminados: ${deletedTokens.count}`);
        console.log(`   - Usuarios no verificados restantes: ${unverifiedUsers}`);
        console.log(`   - Tokens expirados restantes: ${expiredTokens}`);
        console.log(`   - Fecha de corte: ${cutoffDate.toISOString()}`);

        return {
            success: true,
            deletedUsers: deletedUsers.count,
            deletedTokens: deletedTokens.count,
            remainingUnverified: unverifiedUsers,
            remainingExpiredTokens: expiredTokens,
        };

    } catch (error) {
        console.error('❌ Error durante la limpieza:', error);
        return {
            success: false,
            error: error.message,
        };
    } finally {
        await prisma.$disconnect();
    }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    cleanupUnverifiedUsers()
        .then((result) => {
            if (result.success) {
                console.log('🎉 Limpieza completada exitosamente');
                process.exit(0);
            } else {
                console.error('💥 Error en la limpieza:', result.error);
                process.exit(1);
            }
        })
        .catch((error) => {
            console.error('💥 Error inesperado:', error);
            process.exit(1);
        });
}

export { cleanupUnverifiedUsers }; 