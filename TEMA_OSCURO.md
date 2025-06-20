# Sistema de Tema Oscuro - CV Manager

## 🌙 Introducción

Se ha implementado un sistema completo de tema oscuro para la aplicación CV Manager que permite a los usuarios alternar entre tema claro y oscuro de manera fluida.

## ✨ Características

- **Toggle automático**: Botón en la navbar para cambiar entre temas
- **Persistencia**: El tema seleccionado se guarda en localStorage
- **Detección automática**: Respeta la preferencia del sistema operativo
- **Transiciones suaves**: Animaciones CSS para cambios fluidos
- **Responsive**: Funciona correctamente en todas las resoluciones

## 🎨 Colores implementados

### Tema Claro

- Fondo principal: `#ffffff`
- Texto principal: `#171717`
- Tarjetas: `#ffffff`
- Bordes: `#e2e8f0`

### Tema Oscuro

- Fondo principal: `#0f172a`
- Texto principal: `#f8fafc`
- Tarjetas: `#1e293b`
- Bordes: `#334155`

## 🔧 Componentes actualizados

- **ThemeContext**: Manejo de estado global del tema
- **ThemeToggle**: Botón para alternar temas
- **Navbar**: Soporte completo para tema oscuro
- **MainLayout**: Fondo adaptativo
- **Card**: Colores adaptativos
- **Button**: Variantes para ambos temas
- **Input/Textarea/Select**: Controles de formulario adaptativos

## 🚀 Uso

El sistema es completamente automático:

1. **Automático**: Al abrir la app, detecta la preferencia del sistema
2. **Manual**: Usa el botón 🌙/☀️ en la navbar para cambiar
3. **Persistente**: Recuerda tu preferencia entre sesiones

## 🛠️ Para desarrolladores

### Usar clases de Tailwind para tema oscuro:

```tsx
<div className="bg-white dark:bg-gray-800 text-black dark:text-white">
  Contenido adaptativo
</div>
```

### Acceder al contexto de tema:

```tsx
import { useTheme } from "@/contexts";

const { theme, toggleTheme, setTheme } = useTheme();
```

### Variables CSS personalizadas:

Las variables CSS están disponibles en `globals.css` y se pueden usar directamente:

```css
.mi-componente {
  background: var(--background);
  color: var(--foreground);
}
```

## 📁 Archivos modificados

- `src/contexts/ThemeContext.tsx` - Nuevo contexto de tema
- `src/components/ui/ThemeToggle.tsx` - Nuevo botón toggle
- `src/app/layout.tsx` - Provider agregado
- `src/app/globals.css` - Variables CSS y estilos
- `tailwind.config.js` - Configuración de modo oscuro
- Componentes UI actualizados con clases dark:

## 🎯 Próximos pasos

- Considerar temas adicionales (ej: modo sepia, alto contraste)
- Optimizar para impresión en tema oscuro
- Agregar más variaciones de color por contexto

¡El sistema está listo para usar! 🚀
