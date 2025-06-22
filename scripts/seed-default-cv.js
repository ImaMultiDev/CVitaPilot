/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

async function createDefaultCV() {
    try {
        console.log("🔄 Creando CV con datos por defecto...");

        // Buscar el usuario administrador
        const adminUser = await prisma.user.findUnique({
            where: { email: "admin@cvitapilot.com" },
        });

        if (!adminUser) {
            console.error("❌ Usuario administrador no encontrado. Ejecuta primero 'node scripts/create-admin.js'");
            process.exit(1);
        }

        console.log("👤 Usuario administrador encontrado:", adminUser.name);

        // Verificar si ya existe un CV
        const existingCV = await prisma.cV.findFirst({
            where: { userId: adminUser.id },
        });

        if (existingCV) {
            console.log("⚠️  Ya existe un CV para el usuario administrador");
            console.log("🆔 CV ID:", existingCV.id);
            console.log("📄 Nombre:", existingCV.name);
            return;
        }

        // Datos por defecto (los mismos que usa la aplicación)
        const defaultData = {
            name: "CV Principal",
            userId: adminUser.id,
            isActive: true,
            personalName: "Administrador CVitaPilot",
            position: "Desarrollador Full Stack",
            phone: "+34 600 000 000",
            email: "admin@cvitapilot.com",
            linkedin: "https://www.linkedin.com/in/ejemplo",
            github: "https://github.com/ejemplo",
            website: "https://ejemplo.com",
            location: "Madrid, España",
            aboutMe: "Desarrollador con experiencia en tecnologías modernas y metodologías ágiles.",
            drivingLicense: true,
            ownVehicle: true,
        };

        // Crear CV
        const cv = await prisma.cV.create({
            data: defaultData,
        });

        console.log("✅ CV creado exitosamente:", cv.id);

        // Añadir idiomas por defecto
        await prisma.language.createMany({
            data: [
                { cvId: cv.id, name: "Español", level: "Nativo" },
                { cvId: cv.id, name: "English", level: "B2" },
            ],
        });

        // Añadir skills por defecto
        await prisma.skill.createMany({
            data: [
                // Programming Languages
                { cvId: cv.id, name: "JavaScript", category: "language", selected: true },
                { cvId: cv.id, name: "TypeScript", category: "language", selected: true },
                { cvId: cv.id, name: "Python", category: "language", selected: true },

                // Frameworks
                { cvId: cv.id, name: "React", category: "framework", selected: true },
                { cvId: cv.id, name: "Next.js", category: "framework", selected: true },
                { cvId: cv.id, name: "Node.js", category: "framework", selected: true },

                // Databases
                { cvId: cv.id, name: "PostgreSQL", category: "database", selected: true },
                { cvId: cv.id, name: "MySQL", category: "database", selected: true },

                // Tools
                { cvId: cv.id, name: "Git", category: "tool", selected: true },
                { cvId: cv.id, name: "Docker", category: "tool", selected: true },
            ],
        });

        // Añadir competencias por defecto
        await prisma.competence.createMany({
            data: [
                { cvId: cv.id, name: "Desarrollo Full Stack", selected: true },
                { cvId: cv.id, name: "Backend", selected: true },
                { cvId: cv.id, name: "Frontend", selected: true },
                { cvId: cv.id, name: "Bases de Datos", selected: true },
            ],
        });

        // Añadir intereses por defecto
        await prisma.interest.createMany({
            data: [
                { cvId: cv.id, name: "Tecnología", selected: true },
                { cvId: cv.id, name: "Programación", selected: true },
                { cvId: cv.id, name: "Inteligencia Artificial", selected: true },
            ],
        });

        // Añadir habilidades blandas por defecto
        await prisma.softSkill.createMany({
            data: [
                { cvId: cv.id, name: "Trabajo en equipo", selected: true },
                { cvId: cv.id, name: "Comunicación efectiva", selected: true },
                { cvId: cv.id, name: "Resolución de problemas", selected: true },
                { cvId: cv.id, name: "Adaptabilidad", selected: true },
                { cvId: cv.id, name: "Pensamiento crítico", selected: true },
                { cvId: cv.id, name: "Liderazgo", selected: false },
                { cvId: cv.id, name: "Gestión del tiempo", selected: true },
                { cvId: cv.id, name: "Creatividad", selected: false },
                { cvId: cv.id, name: "Empatía", selected: false },
                { cvId: cv.id, name: "Iniciativa", selected: true },
            ],
        });

        // Añadir experiencias laborales por defecto
        await prisma.experience.createMany({
            data: [
                {
                    cvId: cv.id,
                    position: "FullStack Next.js Developer",
                    company: "SYNKROSS",
                    location: "Madrid (Comunidad de Madrid)",
                    startDate: "2025-06",
                    contractType: "Contrato en prácticas",
                    workSchedule: "Jornada completa",
                    workModality: "Híbrido",
                    description: "Next.js (Prisma, PostgreSQL, NextAuth, Formik, Zod), SCRUM, Jira",
                    technologies: ["Next.js", "Prisma", "PostgreSQL", "NextAuth", "Formik", "Zod", "SCRUM", "Jira"],
                    selected: true,
                },
                {
                    cvId: cv.id,
                    position: "Gestor ERP SAP",
                    company: "ERRIBERRI S.L.",
                    location: "Olite (Comunidad foral de Navarra)",
                    startDate: "2024-08",
                    contractType: "Contrato temporal",
                    workSchedule: "Jornada completa",
                    workModality: "Presencial",
                    description: "SAP, Microsoft 365 (SharePoint, Power Platform)",
                    technologies: ["SAP", "Microsoft 365", "SharePoint", "Power Platform"],
                    selected: true,
                },
                {
                    cvId: cv.id,
                    position: "Programación CNC",
                    company: "ERRIBERRI S.L.",
                    location: "Carcastillo (Comunidad foral de Navarra)",
                    startDate: "2023-09",
                    contractType: "Contrato indefinido",
                    workSchedule: "Jornada completa",
                    workModality: "Presencial",
                    description: "Elaboración de programas CNC para mecanizado, control de producción",
                    technologies: ["CNC", "Mecanizado"],
                    selected: false,
                },
                {
                    cvId: cv.id,
                    position: "Marketing y Comercio Digital",
                    company: "SUPERRECAMBIOS.COM",
                    location: "Pamplona (Comunidad foral de Navarra)",
                    startDate: "2017-03",
                    contractType: "Contrato temporal",
                    workSchedule: "Jornada completa",
                    workModality: "Presencial",
                    description: "Gestión e investigación comercial, análisis de mercado, marketing, comunicación",
                    technologies: ["Marketing Digital", "Análisis de mercado"],
                    selected: false,
                },
            ],
        });

        // Añadir formación por defecto
        await prisma.education.createMany({
            data: [
                {
                    cvId: cv.id,
                    title: "FPS Desarrollo de Aplicaciones Multiplataforma",
                    institution: "U-TAD",
                    location: "Madrid (Comunidad de Madrid)",
                    startYear: "2023",
                    endYear: "2025",
                    type: "formal",
                    selected: true,
                },
                {
                    cvId: cv.id,
                    title: "FPI Programación CNC - Mecanizado por arranque de viruta",
                    institution: "CIP ETI",
                    location: "Tudela (Comunidad foral de Navarra)",
                    startYear: "2017",
                    endYear: "2018",
                    type: "formal",
                    selected: false,
                },
                {
                    cvId: cv.id,
                    title: "FPS Gestión Comercial y Marketing",
                    institution: "CI Maria Ana Sanz",
                    location: "Pamplona (Comunidad foral de Navarra)",
                    startYear: "2014",
                    endYear: "2016",
                    type: "formal",
                    selected: false,
                },
                {
                    cvId: cv.id,
                    title: "Curso de Desarrollo Web Full Stack",
                    institution: "Codecademy",
                    location: "Online",
                    startYear: "2022",
                    endYear: "2023",
                    type: "additional",
                    duration: "400 horas",
                    selected: true,
                },
                {
                    cvId: cv.id,
                    title: "Certificación AWS Cloud Practitioner",
                    institution: "Amazon Web Services",
                    location: "Online",
                    startYear: "2024",
                    endYear: "2024",
                    type: "additional",
                    duration: "120 horas",
                    selected: false,
                },
            ],
        });

        // Añadir certificaciones por defecto
        await prisma.certification.createMany({
            data: [
                {
                    cvId: cv.id,
                    name: "AWS Cloud Practitioner",
                    issuer: "Amazon Web Services",
                    date: "2024-03-15",
                    expiryDate: "2027-03-15",
                    credentialId: "AWS-CP-2024-123456",
                    url: "https://aws.amazon.com/verification/AWS-CP-2024-123456",
                    selected: true,
                },
                {
                    cvId: cv.id,
                    name: "React Developer Certification",
                    issuer: "Meta",
                    date: "2023-11-20",
                    credentialId: "META-REACT-2023-789012",
                    url: "https://coursera.org/verify/META-REACT-2023-789012",
                    selected: true,
                },
                {
                    cvId: cv.id,
                    name: "Java SE 11 Developer",
                    issuer: "Oracle",
                    date: "2023-08-10",
                    expiryDate: "2026-08-10",
                    credentialId: "OCP-JAVA-SE11-345678",
                    selected: true,
                },
                {
                    cvId: cv.id,
                    name: "Scrum Master Certified (SMC)",
                    issuer: "Scrum Alliance",
                    date: "2024-01-25",
                    expiryDate: "2026-01-25",
                    credentialId: "SA-SMC-2024-901234",
                    url: "https://scrumalliance.org/verify/SA-SMC-2024-901234",
                    selected: true,
                },
                {
                    cvId: cv.id,
                    name: "Google Analytics Individual Qualification",
                    issuer: "Google",
                    date: "2023-06-05",
                    expiryDate: "2024-06-05",
                    credentialId: "GA-IQ-2023-567890",
                    selected: false,
                },
                {
                    cvId: cv.id,
                    name: "Microsoft Azure Fundamentals",
                    issuer: "Microsoft",
                    date: "2024-02-12",
                    credentialId: "MS-AZ900-2024-123789",
                    url: "https://learn.microsoft.com/verify/MS-AZ900-2024-123789",
                    selected: false,
                },
            ],
        });

        // Añadir logros y proyectos por defecto
        await prisma.achievement.createMany({
            data: [
                {
                    cvId: cv.id,
                    title: "Desarrollo de Sistema ERP Completo",
                    type: "project",
                    description: "Diseñé y desarrollé un sistema ERP completo para gestión empresarial, incluyendo módulos de inventario, facturación, CRM y reporting avanzado.",
                    date: "2024",
                    company: "ERRIBERRI S.L.",
                    technologies: ["SAP", "Microsoft 365", "SharePoint", "Power Platform"],
                    metrics: "Redujo tiempo de procesamiento de pedidos en 40% y mejoró eficiencia operativa en 25%",
                    selected: true,
                },
                {
                    cvId: cv.id,
                    title: "Aplicación Web Full Stack con Next.js",
                    type: "project",
                    description: "Desarrollé una aplicación web completa de gestión de CVs con funcionalidades avanzadas de edición, exportación PDF y sistema de entregas.",
                    date: "2024-2025",
                    technologies: ["Next.js", "React", "Prisma", "PostgreSQL", "TypeScript", "Tailwind CSS"],
                    metrics: "Aplicación utilizada por más de 100 usuarios con 95% de satisfacción",
                    url: "https://github.com/ejemplo/cv-gestor",
                    selected: true,
                },
                {
                    cvId: cv.id,
                    title: "Certificación AWS Cloud Practitioner",
                    type: "achievement",
                    description: "Obtuve la certificación AWS Cloud Practitioner, demostrando conocimientos sólidos en servicios de nube y arquitectura AWS.",
                    date: "2024-03",
                    company: "Amazon Web Services",
                    technologies: ["AWS", "Cloud Computing", "EC2", "S3", "RDS"],
                    metrics: "Puntuación: 850/1000 (85%)",
                    selected: true,
                },
                {
                    cvId: cv.id,
                    title: "Optimización de Procesos CNC",
                    type: "achievement",
                    description: "Implementé mejoras en procesos de programación CNC que resultaron en significativa reducción de tiempos de producción.",
                    date: "2023",
                    company: "ERRIBERRI S.L.",
                    technologies: ["CNC Programming", "CAD/CAM", "Lean Manufacturing"],
                    metrics: "Redujo tiempo de setup en 30% y aumentó productividad en 20%",
                    selected: true,
                },
                {
                    cvId: cv.id,
                    title: "Sistema de Análisis de Mercado Digital",
                    type: "project",
                    description: "Desarrollé herramientas de análisis para investigación comercial y marketing digital, automatizando procesos de recopilación de datos.",
                    date: "2017",
                    company: "SUPERRECAMBIOS.COM",
                    technologies: ["Marketing Digital", "Analytics", "Data Analysis", "Excel VBA"],
                    metrics: "Aumentó eficiencia en análisis de mercado en 60%",
                    selected: false,
                },
                {
                    cvId: cv.id,
                    title: "Reconocimiento por Excelencia Académica",
                    type: "achievement",
                    description: "Reconocimiento por mantener expediente académico sobresaliente durante toda la formación en Desarrollo de Aplicaciones Multiplataforma.",
                    date: "2025",
                    company: "U-TAD",
                    technologies: [],
                    metrics: "Nota media: 9.2/10",
                    selected: false,
                },
            ],
        });

        // Añadir referencias por defecto
        await prisma.reference.createMany({
            data: [
                {
                    cvId: cv.id,
                    name: "María González Pérez",
                    position: "Gerente de Sistemas",
                    company: "ERRIBERRI S.L.",
                    relationship: "Supervisora directa",
                    phone: "+34 948 123 456",
                    email: "maria.gonzalez@erriberri.com",
                    yearsWorking: "2 años trabajando juntos",
                    selected: true,
                },
                {
                    cvId: cv.id,
                    name: "Carlos Martínez López",
                    position: "Lead Developer",
                    company: "SYNKROSS",
                    relationship: "Supervisor técnico",
                    phone: "+34 915 789 012",
                    email: "carlos.martinez@synkross.com",
                    yearsWorking: "6 meses colaborando",
                    selected: true,
                },
                {
                    cvId: cv.id,
                    name: "Ana Rodríguez Sánchez",
                    position: "Directora Académica",
                    company: "U-TAD",
                    relationship: "Tutora académica",
                    phone: "+34 918 567 890",
                    email: "ana.rodriguez@u-tad.com",
                    yearsWorking: "2 años de formación",
                    selected: false,
                },
            ],
        });

        console.log("✅ Datos completos agregados exitosamente:");
        console.log("   📄 Información personal");
        console.log("   🗣️  2 idiomas");
        console.log("   💻 10 skills técnicas");
        console.log("   🎯 4 competencias");
        console.log("   ❤️  3 intereses");
        console.log("   🤝 10 habilidades blandas");
        console.log("   💼 4 experiencias laborales");
        console.log("   🎓 5 formaciones");
        console.log("   🏆 6 certificaciones");
        console.log("   🚀 6 logros y proyectos");
        console.log("   👥 3 referencias");
        console.log("");
        console.log("🚀 ¡CV completo con todos los datos de ejemplo creado!");
        console.log("🌐 Accede a tu aplicación y verás el editor totalmente funcional");

    } catch (error) {
        console.error("❌ Error al crear CV por defecto:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

// Ejecutar script
createDefaultCV(); 