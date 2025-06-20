# CV Gestor - Generador Profesional de Curriculum Vitae

Una aplicación web moderna y profesional para crear, personalizar y gestionar múltiples versiones de tu CV con **formatos duales**: **Visual** para reclutadores humanos y **ATS** para sistemas automáticos. Desarrollada con **Next.js 15**, **Prisma** y **PostgreSQL** para ofrecer persistencia real y diseños optimizados tanto para impresión como para compatibilidad ATS.

![CV Gestor](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748.svg)

## 🚀 Características Principales

### ✨ Editor Inteligente de CV

- **Formularios Inline**: Edita directamente cada sección sin modales complejos
- **Activación Selectiva**: Activa/desactiva habilidades, experiencias y formación con un click
- **Categorización Avanzada**: Organiza habilidades por tipo (lenguajes, frameworks, bases de datos, etc.)
- **Dual Formación**: Distingue entre formación oficial y adicional
- **Indicador de CV Activo**: Siempre sabes qué CV estás editando

### 🎨 Diseño Profesional

- **Layout Elegante**: Diseño de dos columnas inspirado en CVs profesionales
- **Sidebar Informativo**: Datos personales, competencias, idiomas y especialización
- **Header Destacado**: Nombre y puesto objetivo con fondo elegante
- **Tipografía Optimizada**: Diseño compacto y legible
- **Colores Corporativos**: Paleta gris oscuro con acentos cyan

### 📄 Formatos Duales de CV

#### 🎨 Formato Visual

- **Diseño Atractivo**: Layout elegante con colores y estilos modernos
- **Sidebar Informativo**: Datos organizados en columnas profesionales
- **Colores Corporativos**: Paleta gris oscuro con acentos cyan
- **Impacto Visual**: Perfecto para reclutadores humanos

#### 🤖 Formato ATS (Applicant Tracking System)

- **Optimizado para Sistemas Automatizados**: Diseño simple que garantiza compatibilidad con software de reclutamiento
- **Estructura Estándar**: Layout lineal sin elementos gráficos complejos
- **Fuente Universal**: Arial/sans-serif para máxima legibilidad automática
- **Texto Negro sobre Blanco**: Máximo contraste para parsing óptimo
- **Keywords Destacadas**: Tecnologías y competencias claramente separadas
- **Secciones en Mayúsculas**: Headers reconocibles por algoritmos
- **Márgenes Profesionales**: Espaciado adecuado para impresión limpia

### 📄 Exportación PDF Perfecta

- **Formato A4**: Optimizado para impresión estándar
- **Dual Format Support**: Mantiene estilos específicos de cada formato
- **Estilos de Impresión**: Los colores y diseño se mantienen en el PDF
- **Sin Distracciones**: Oculta automáticamente elementos de navegación
- **Guía Inteligente**: Instrucciones específicas según formato seleccionado
- **Vista Previa Limpia**: Página dedicada sin sidebar de edición
- **Impresión por Páginas**: Opción para imprimir páginas individuales

### 💾 Persistencia con Base de Datos

- **PostgreSQL**: Base de datos robusta y escalable
- **Prisma ORM**: Manejo type-safe de datos
- **Server Actions**: API moderna de Next.js 15
- **Múltiples Versiones**: Guarda y gestiona diferentes CVs
- **CV Activo**: Sistema de activación para trabajar con una versión específica

### 🔧 Gestión Simplificada

- **Mis CVs**: Lista y gestiona todas tus versiones guardadas
- **Activación Rápida**: Cambia entre CVs con un click
- **Eliminación Segura**: Confirmaciones para acciones destructivas
- **Configuración Mínima**: Solo información esencial y consejos útiles

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

- **Framework**: Next.js 15 con App Router
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Base de Datos**: PostgreSQL
- **ORM**: Prisma 5
- **Deployment**: Vercel-ready

### Arquitectura de Datos

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│       User      │    │       CV        │    │   Languages     │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ id              │◄──┤│ id              │    │ id              │
│ name            │    │ user_id         │    │ cv_id           │
│ email           │    │ is_current      │◄──┤│ name            │
│ created_at      │    │ name            │    │ level           │
└─────────────────┘    │ personal_info   │    └─────────────────┘
                       │ about_me        │
                       │ created_at      │    ┌─────────────────┐
                       └─────────────────┘    │     Skills      │
                                              ├─────────────────┤
┌─────────────────┐    ┌─────────────────┐    │ id              │
│  Experiences    │    │   Education     │    │ cv_id           │
├─────────────────┤    ├─────────────────┤    │ name            │
│ id              │    │ id              │◄──┤│ category        │
│ cv_id           │◄──┤│ cv_id           │    │ selected        │
│ company         │    │ institution     │    └─────────────────┘
│ position        │    │ degree          │
│ selected        │    │ type            │    ┌─────────────────┐
│ technologies    │    │ selected        │    │  Competences    │
└─────────────────┘    └─────────────────┘    ├─────────────────┤
                                              │ id              │
                                              │ cv_id           │
                                              │ name            │
                                              │ selected        │
                                              └─────────────────┘
```

## 📁 Estructura del Proyecto

```
cv-gestor/
├── prisma/
│   └── schema.prisma           # Esquema de base de datos
├── src/
│   ├── app/                    # App Router Next.js 15
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Editor principal
│   │   ├── preview/           # Vista previa sin sidebar
│   │   ├── saved-cvs/         # Gestión de CVs guardados
│   │   ├── settings/          # Configuración simplificada
│   │   └── globals.css        # Estilos globales + print
│   ├── components/
│   │   ├── ui/               # Componentes base (Button, Input, etc.)
│   │   ├── forms/            # Formularios específicos con Prisma
│   │   ├── layout/           # MainLayout, Navbar, Sidebar
│   │   ├── cv/               # CVPreviewPrisma con diseño elegante
│   │   ├── editor/           # CVEditorPrisma con formularios inline
│   │   ├── saved/            # SavedCVsPage simplificado
│   │   └── settings/         # SettingsPage minimalista
│   ├── lib/
│   │   ├── actions/          # Server Actions para CRUD
│   │   └── prisma.ts         # Cliente Prisma
│   ├── types/
│   │   └── cv.ts             # Tipos TypeScript
│   └── utils/
│       ├── cvUtils.ts        # Utilidades del CV
│       └── dateUtils.ts      # Utilidades de fechas
├── package.json
├── next.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js 18+**
- **PostgreSQL** ejecutándose en puerto 5433
- **npm/yarn/pnpm**

### 1. Clonar el Repositorio

```bash
git clone https://github.com/ImaMultiDev/cv-gestor.git
cd cv-gestor
```

### 2. Instalar Dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Configurar Base de Datos

Crea un archivo `.env` en la raíz del proyecto:

```env
# Database
DATABASE_URL="postgresql://usuario:password@localhost:5433/cv_gestor"
```

### 4. Configurar Prisma

```bash
# Generar cliente Prisma
npx prisma generate

# Crear tablas en la base de datos
npx prisma db push

# (Opcional) Abrir Prisma Studio
npx prisma studio
```

### 5. Iniciar el Servidor

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📝 Guía de Uso

### 🎯 Editor Principal (`/`)

1. **Información Personal**: Completa datos de contacto
2. **Descripción**: Añade tu "About me" profesional
3. **Formularios Inline**:
   - Idiomas con niveles
   - Habilidades por categorías
   - Competencias profesionales
   - Experiencias laborales con tecnologías
   - Formación (oficial y adicional)
4. **Sidebar Dinámico**: Ve estadísticas en tiempo real
5. **Guardar CV**: Crea versiones con nombres descriptivos

### 👁️ Vista Previa (`/preview`)

1. **Selector de Formato**: Alterna entre formato Visual y ATS
   - **🎨 Formato Visual**: Diseño atractivo con colores para reclutadores humanos
   - **🤖 Formato ATS**: Optimizado para sistemas automáticos de selección
2. **Diseño Profesional**: Layouts específicos según el formato elegido
3. **Sin Distracciones**: Solo el CV, sin sidebar de edición
4. **Exportar PDF**: Botones dedicados con guías específicas por formato
5. **Impresión Selectiva**: Imprime el CV completo o páginas individuales
6. **Indicador de CV**: Muestra qué CV estás previsualizando
7. **Instrucciones Dinámicas**: Guías de impresión adaptadas al formato seleccionado

### 💼 Mis CVs (`/saved-cvs`)

1. **CV Activo**: Sección destacada del CV en uso
2. **Lista de CVs**: Todos tus CVs guardados
3. **Acciones Rápidas**: Activar y eliminar CVs
4. **Contador**: Total de CVs guardados

### ⚙️ Configuración (`/settings`)

1. **Información de la App**: Versión, tecnologías, desarrollador
2. **Repositorio**: Enlace directo al código fuente
3. **Consejos de Uso**: Tips para optimizar tu flujo de trabajo

## 🤖 Optimización ATS (Applicant Tracking System)

### ¿Qué es un Sistema ATS?

Los **Applicant Tracking Systems** son software utilizados por empresas para filtrar y gestionar candidatos automáticamente. Estos sistemas escanean CVs buscando keywords específicas y estructuras reconocibles antes de que lleguen a un reclutador humano.

### 🎯 Características del Formato ATS en CV Gestor

#### ✅ Optimizaciones Implementadas

1. **Fuente Estándar**: Arial/sans-serif para máxima compatibilidad
2. **Estructura Lineal**: Sin columnas complejas o elementos flotantes
3. **Encabezados Claros**: Secciones en MAYÚSCULAS para fácil reconocimiento
4. **Texto Plano**: Sin elementos gráficos que confundan el parsing
5. **Contraste Máximo**: Texto negro sobre fondo blanco
6. **Separación Clara**: Keywords y tecnologías separadas por comas
7. **Orden Lógico**: Flujo estándar de información
8. **Márgenes Adecuados**: Espaciado profesional (20mm laterales, 15mm verticales)

#### 📊 Secciones Optimizadas

- **INFORMACIÓN DE CONTACTO**: Grid simple con datos esenciales
- **PERFIL PROFESIONAL**: Descripción clara sin adornos
- **HABILIDADES TÉCNICAS**: Organizadas por categorías reconocibles
- **COMPETENCIAS PROFESIONALES**: Lista separada por comas
- **HABILIDADES INTERPERSONALES**: Soft skills destacadas
- **EXPERIENCIA LABORAL**: Formato cronológico con tecnologías explícitas
- **FORMACIÓN ACADÉMICA**: Títulos y fechas en formato estándar
- **CERTIFICACIONES**: Con IDs y URLs de verificación
- **IDIOMAS**: Niveles claramente especificados

### 🔄 Cuándo Usar Cada Formato

#### 🎨 Formato Visual - Úsalo cuando:

- Envías CV directamente a reclutadores humanos
- Participas en entrevistas presenciales
- La empresa es pequeña/startup sin ATS sofisticados
- Quieres destacar visualmente tu perfil

#### 🤖 Formato ATS - Úsalo cuando:

- Aplicas a través de portales de empleo online
- La empresa es grande/corporativa con procesos automatizados
- El puesto requiere pasar por múltiples filtros automáticos
- Quieres maximizar compatibilidad con cualquier sistema

### 💡 Consejos para Optimización ATS

1. **Keywords Relevantes**: Incluye términos exactos del job posting
2. **Nombres Completos**: Usa nombres completos de tecnologías (JavaScript, no JS)
3. **Formatos Estándar**: Fechas en formato MM/YYYY
4. **Secciones Estándar**: Mantén nombres de sección reconocibles
5. **Sin Creatividad Gráfica**: El formato ATS prioriza funcionalidad sobre diseño

## 🎨 Características del Diseño

### Layout del CV

```
┌─────────────────────────────────────────────────────────┐
│              [NOMBRE COMPLETO]                          │
│              [PUESTO OBJETIVO]                          │
├─────────────────┬───────────────────────────────────────┤
│   SIDEBAR       │           CONTENIDO PRINCIPAL         │
│   (33%)         │                (67%)                  │
│                 │                                       │
│ Personal Data   │ About me                              │
│ • Teléfono      │ [Descripción profesional]             │
│ • Email         │                                       │
│ • LinkedIn      │ Experience                            │
│ • GitHub        │ [Lista de experiencias]               │
│ • Website       │                                       │
│ • Ubicación     │ Formation                             │
│                 │ [Formación oficial]                   │
│ Competencies    │                                       │
│ [Lista inline]  │ Other formation                       │
│                 │ [Cursos adicionales]                  │
│ Languages       │                                       │
│ [Nivel por      │                                       │
│  idioma]        │                                       │
│                 │                                       │
│ Specialization  │                                       │
│ [Habilidades    │                                       │
│  por categoría] │                                       │
│                 │                                       │
│ Other Info      │                                       │
│ • Carnet        │                                       │
│ • Vehículo      │                                       │
└─────────────────┴───────────────────────────────────────┘
```

### Colores y Estilos

- **Header**: Fondo gris oscuro (`bg-gray-700`)
- **Sidebar**: Fondo gris oscuro con texto blanco
- **Headers de Sección**: Fondo cyan (`bg-cyan-500`)
- **Contenido Principal**: Fondo blanco
- **Tipografía**: Jerarquía clara y compacta

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo con Turbopack
npm run build            # Build de producción
npm run start            # Servidor de producción

# Base de datos
npx prisma generate      # Generar cliente Prisma
npx prisma db push       # Aplicar esquema a BD
npx prisma studio        # Interfaz visual de BD
npx prisma migrate reset # Resetear BD (desarrollo)

# Calidad de código
npm run lint             # ESLint
npm run type-check       # Verificar TypeScript
```

## 🔒 Privacidad y Seguridad

- **Datos Locales**: Tu información permanece en tu base de datos local
- **Sin Servidores Externos**: No se envían datos a terceros
- **Control Total**: Tienes acceso completo a tus datos
- **Backup Manual**: Usa Prisma Studio para exportar datos

## 📊 Modelo de Datos

### CV Principal

```typescript
interface CVData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    website?: string;
    position: string;
  };
  aboutMe: string;
  languages: Language[];
  skills: Skill[];
  competences: Competence[];
  experiences: Experience[];
  education: Education[];
  drivingLicense: boolean;
  ownVehicle: boolean;
}
```

### Formación con Tipos

```typescript
interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  type: "formal" | "additional"; // Nueva característica
  selected: boolean;
}
```

## 🚀 Evolución del Proyecto

### Fases de Desarrollo

1. **Fase 1**: Prototipo con localStorage y React Context
2. **Fase 2**: Migración a Prisma + PostgreSQL
3. **Fase 3**: Implementación de Server Actions
4. **Fase 4**: Rediseño de editor con formularios inline
5. **Fase 5**: Rediseño de CV inspirado en diseños profesionales
6. **Fase 6**: Optimización para PDF y impresión
7. **Fase 7**: Simplificación de funcionalidades según necesidades reales

### Decisiones de Diseño

- **Formularios Inline vs Modales**: Mejor UX para edición rápida
- **Sidebar Contextual**: Solo en editor, no en preview
- **CV Activo**: Un CV principal para evitar confusión
- **Gestión Simplificada**: Enfoque en funcionalidades esenciales
- **PDF Nativo**: Usar `window.print()` en lugar de librerías complejas

## 🤝 Contribución y Desarrollo

### Desarrollado Para

**Imanol Mugueta Unsain** - Desarrollador Multiplataforma

### Tecnologías Empleadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Base de Datos**: PostgreSQL + Prisma
- **Styling**: Tailwind CSS v4
- **Architecture**: Server Actions, App Router
- **Development**: ESLint, Prettier, Git

### Funcionalidades Implementadas ✅

- **✅ Formatos Duales**: Formato Visual y ATS implementados
- **✅ Optimización ATS**: Diseño específico para sistemas automáticos
- **✅ Impresión Selectiva**: Páginas individuales o CV completo
- **✅ Instrucciones Dinámicas**: Guías específicas por formato

### Posibles Mejoras Futuras

- **Templates Múltiples**: Más variaciones de diseño para cada formato
- **Integración LinkedIn**: Importar datos automáticamente
- **AI Suggestions**: Mejoras sugeridas por IA para optimización ATS
- **Multi-idioma**: Soporte para múltiples idiomas
- **Cloud Sync**: Sincronización en la nube opcional
- **Análisis ATS**: Puntuación de compatibilidad con sistemas automáticos

## 📞 Contacto

**Desarrollador**: Imanol Mugueta Unsain

- **Email**: contact@imamultidev.dev
- **LinkedIn**: [imanol-mugueta-unsain](https://linkedin.com/in/imanol-mugueta-unsain)
- **GitHub**: [@kodebidean](https://github.com/kodebidean)
- **Website**: [imamultidev.dev](https://imamultidev.dev)
- **Repositorio**: [https://github.com/ImaMultiDev/cv-gestor](https://github.com/ImaMultiDev/cv-gestor)

## 📄 Licencia

Este proyecto es de **uso personal y profesional**. El código fuente puede ser utilizado como referencia o base para otros proyectos similares.

---

**¡Gracias por usar CV Gestor!**

_Una herramienta profesional desarrollada por y para desarrolladores que buscan destacar en su carrera profesional._
