# CV Manager - Gestor de Curriculum Vitae

Una aplicación web moderna y profesional para crear, personalizar y gestionar múltiples versiones de tu CV según cada oportunidad laboral.

## 🚀 Características Principales

### ✨ Gestión Inteligente de CV

- **Editor Visual Completo**: Interfaz intuitiva para editar todos los aspectos de tu CV
- **Múltiples Versiones**: Guarda diferentes versiones de tu CV para distintos tipos de empresa
- **Personalización Rápida**: Activa/desactiva habilidades, experiencias y formación con un click
- **Vista Previa en Tiempo Real**: Ve cómo queda tu CV mientras lo editas

### 📊 Seguimiento y Analíticas

- **Historial de Entregas**: Registra a qué empresas has enviado cada CV
- **Estados de Aplicación**: Seguimiento del proceso (Enviado, Entrevista, Rechazado, Aceptado)
- **Estadísticas Detalladas**: Análisis de tasa de respuesta y aceptación
- **Dashboard Intuitivo**: Resumen visual de tu actividad de búsqueda de empleo

### 🛠️ Herramientas Avanzadas

- **Exportación Múltiple**: PDF, JSON, texto plano
- **Validación Automática**: Verifica la completitud de tu CV
- **Sugerencias Inteligentes**: Recomendaciones para mejorar tu CV
- **Backup y Restauración**: Exporta e importa tus datos de forma segura

## 🏗️ Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Estado**: React Context + useReducer
- **Persistencia**: LocalStorage (sin dependencias externas)
- **Desarrollo**: ESLint, App Router de Next.js

## 📋 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── preview/           # Vista previa del CV
│   ├── saved-cvs/         # CVs guardados
│   └── settings/          # Configuración
├── components/            # Componentes React
│   ├── ui/               # Componentes base (Button, Input, etc.)
│   ├── forms/            # Formularios específicos
│   ├── layout/           # Layout y navegación
│   ├── cv/               # Componentes del CV
│   ├── editor/           # Editor principal
│   ├── saved/            # Gestión de CVs guardados
│   ├── analytics/        # Componentes de analíticas
│   ├── dashboard/        # Dashboard principal
│   └── settings/         # Configuración
├── contexts/             # Contextos de React
│   └── CVContext.tsx     # Estado principal de la aplicación
├── hooks/                # Hooks personalizados
│   ├── useLocalStorage.ts
│   ├── useCVPersistence.ts
│   └── useCVAnalytics.ts
├── types/                # Definiciones de TypeScript
│   └── cv.ts             # Tipos del CV
├── utils/                # Utilidades
│   ├── cvUtils.ts        # Utilidades del CV
│   └── dateUtils.ts      # Utilidades de fechas
└── views/                # Vistas principales
    └── Home/             # Vista de inicio
```

## 🎯 Casos de Uso

### Para Desarrolladores

- Mantén diferentes versiones destacando distintos stacks tecnológicos
- Personaliza experiencias según el tipo de empresa (startup vs corporativa)
- Gestiona tu portafolio de proyectos y tecnologías

### Para Profesionales en General

- Adapta tu CV según el sector o puesto específico
- Destaca competencias relevantes para cada oportunidad
- Mantén un historial organizado de tus aplicaciones

### Para Búsqueda Activa de Empleo

- Rastrea el progreso de tus aplicaciones
- Analiza qué versiones de CV tienen mejor tasa de éxito
- Optimiza tu estrategia basándote en datos reales

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18 o superior
- npm, yarn, pnpm o bun

### Pasos de Instalación

1. **Clona o crea el proyecto**

```bash
git clone https://github.com/ImaMultiDev/cv-gestor.git
```

```bash
npx create-next-app@latest cv-manager --typescript --tailwind --eslint --app --src-dir
cd cv-manager
```

2. **Instala las dependencias**

```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Actualiza package.json**

```json
{
  "name": "cv-manager",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "15.3.4"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "15.3.4",
    "@eslint/eslintrc": "^3"
  }
}
```

4. **Configura Tailwind CSS**
   Asegúrate de que tu `postcss.config.mjs` tenga:

```javascript
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
```

5. **Inicia el servidor de desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📝 Uso de la Aplicación

### 1. Configuración Inicial

1. Ve al **Editor** (página principal)
2. Completa tu **información personal**
3. Añade tu **descripción profesional**
4. Configura tus **idiomas**

### 2. Gestión de Habilidades

1. Usa el **sidebar** para activar/desactivar habilidades
2. Añade nuevas habilidades por categoría:
   - Lenguajes de programación
   - Frameworks
   - Bases de datos
   - Herramientas
   - Librerías

### 3. Experiencias y Formación

1. Añade tus **experiencias laborales** con tecnologías específicas
2. Incluye tu **formación oficial** y **cursos adicionales**
3. Activa/desactiva elementos según el puesto objetivo

### 4. Vista Previa y Guardado

1. Ve a **Vista Previa** para ver tu CV formateado
2. **Guarda versiones** específicas con nombres descriptivos
3. **Exporta** en diferentes formatos

### 5. Seguimiento de Aplicaciones

1. En **Mis CVs**, registra entregas a empresas
2. Actualiza el estado de cada aplicación
3. Revisa las **analíticas** para optimizar tu estrategia

## 🎨 Personalización

### Modificar Estilos

Los estilos se gestionan con Tailwind CSS v4. Puedes:

- Modificar `src/app/globals.css` para estilos globales
- Personalizar componentes en sus archivos respectivos
- Usar las variables CSS definidas en `:root`

### Añadir Nuevas Secciones

1. Define nuevos tipos en `src/types/cv.ts`
2. Actualiza el contexto en `src/contexts/CVContext.tsx`
3. Crea formularios en `src/components/forms/`
4. Actualiza la vista previa en `src/components/cv/CVPreview.tsx`

### Extender Funcionalidades

- **Nuevos formatos de exportación**: Modifica `src/utils/cvUtils.ts`
- **Integraciones externas**: Añade en `src/hooks/`
- **Analíticas avanzadas**: Extiende `src/hooks/useCVAnalytics.ts`

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye la aplicación
npm run start        # Inicia servidor de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
npm run type-check   # Verifica tipos de TypeScript
```

## 📊 Estructura de Datos

### CV Principal (CVData)

```typescript
interface CVData {
  personalInfo: PersonalInfo; // Información de contacto
  aboutMe: string; // Descripción profesional
  languages: Language[]; // Idiomas y niveles
  skills: Skill[]; // Habilidades técnicas
  competences: Competence[]; // Competencias profesionales
  interests: Interest[]; // Intereses personales
  experiences: Experience[]; // Experiencia laboral
  education: Education[]; // Formación académica
  drivingLicense: boolean; // Carnet de conducir
  ownVehicle: boolean; // Vehículo propio
}
```

### CV Guardado (SavedCV)

```typescript
interface SavedCV {
  id: string;
  name: string; // Nombre descriptivo
  data: CVData; // Datos del CV
  createdAt: string; // Fecha de creación
  updatedAt: string; // Última modificación
  deliveries: CVDelivery[]; // Historial de entregas
}
```

## 🔒 Privacidad y Datos

- **Almacenamiento Local**: Todos los datos se guardan en el navegador (localStorage)
- **Sin Servidor**: No se envían datos a servidores externos
- **Control Total**: Tú tienes el control completo de tu información
- **Exportación**: Puedes exportar y respaldar tus datos en cualquier momento

## 🤝 Contribución

Este proyecto fue desarrollado específicamente para Imanol Mugueta Unsain, pero el código puede servir como base para otros proyectos similares.

### Posibles Mejoras Futuras

- [ ] Exportación a PDF mejorada
- [ ] Templates de CV adicionales
- [ ] Integración con APIs de LinkedIn
- [ ] Análisis de palabras clave por sector
- [ ] Recomendaciones basadas en IA
- [ ] Versión móvil nativa

## 📞 Contacto

**Desarrollador**: Imanol Mugueta Unsain

- **Email**: contact@imamultidev.dev
- **LinkedIn**: [imanol-mugueta-unsain](https://www.linkedin.com/in/imanol-mugueta-unsain/)
- **GitHub**: [kodebidean](https://github.com/kodebidean)
- **Website**: [imamultidev.dev](https://imamultidev.dev)

## 📄 Licencia

Este proyecto es de uso personal y profesional. El código fuente puede ser utilizado como referencia o base para otros proyectos.

---

**¡Gracias por usar CV Manager! 🚀**

_Una herramienta profesional para profesionales que buscan destacar en su carrera._
