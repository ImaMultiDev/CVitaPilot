# 🚀 Guía de Despliegue - CVitaPilot

## 🔧 Solución de Problemas de Base de Datos

### Error: "Base de Datos No Configurada"

Si ves este error en producción, sigue estos pasos:

## 📋 Pasos de Solución

### 1. **Verificar Variables de Entorno**

```bash
# Verificar que todas las variables estén configuradas
npm run db:check-env
```

**Variables requeridas:**

- `DATABASE_URL` - URL de conexión a PostgreSQL
- `NEXTAUTH_SECRET` - Clave secreta para NextAuth
- `NEXTAUTH_URL` - URL de tu aplicación
- `GOOGLE_CLIENT_ID` - ID de cliente de Google OAuth
- `GOOGLE_CLIENT_SECRET` - Secreto de cliente de Google OAuth

### 2. **Diagnosticar Base de Datos**

```bash
# Ejecutar diagnóstico completo
npm run db:diagnose
```

Este comando verificará:

- ✅ Conexión a PostgreSQL
- ✅ Existencia de tablas
- ✅ Permisos de usuario
- ✅ Estado de las tablas principales

### 3. **Configurar Base de Datos**

```bash
# Configuración automática completa
npm run db:setup-prod
```

Este comando:

1. Verifica variables de entorno
2. Genera cliente Prisma
3. Conecta a PostgreSQL
4. Aplica esquema de base de datos
5. Verifica tablas creadas
6. Verifica usuario administrador

### 4. **Configuración Manual (si es necesario)**

```bash
# Generar cliente Prisma
npx prisma generate

# Aplicar esquema a la base de datos
npx prisma db push

# Verificar en Prisma Studio (opcional)
npx prisma studio
```

## 🔍 Diagnóstico por Plataforma

### **Vercel**

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Verifica que `DATABASE_URL` esté configurada
4. Ejecuta: `npm run db:setup-prod`

### **Railway**

1. Ve a tu proyecto en Railway Dashboard
2. Variables → Environment Variables
3. Verifica `DATABASE_URL`
4. Ejecuta: `npm run db:setup-prod`

### **Render**

1. Ve a tu servicio en Render Dashboard
2. Environment → Environment Variables
3. Verifica `DATABASE_URL`
4. Ejecuta: `npm run db:setup-prod`

### **Netlify**

1. Ve a tu sitio en Netlify Dashboard
2. Site settings → Environment variables
3. Verifica `DATABASE_URL`
4. Ejecuta: `npm run db:setup-prod`

## 🛠️ Scripts Disponibles

```bash
# Diagnóstico de base de datos
npm run db:diagnose

# Configuración automática
npm run db:setup

# Verificar variables de entorno
npm run db:check-env

# Configuración de producción
npm run db:setup-prod

# Crear usuario administrador
npm run auth:create-admin

# Configuración completa
npm run auth:setup
```

## 🔗 Configuración de Base de Datos

### **PostgreSQL Local**

```bash
# Instalar PostgreSQL
# Crear base de datos
createdb cvitapilot

# Configurar DATABASE_URL
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/cvitapilot"
```

### **PostgreSQL en la Nube**

**Supabase:**

```
DATABASE_URL="postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres"
```

**Neon:**

```
DATABASE_URL="postgresql://[user]:[password]@[host]/[database]?sslmode=require"
```

**PlanetScale:**

```
DATABASE_URL="mysql://[user]:[password]@[host]/[database]"
```

## 🚨 Problemas Comunes

### **Error: "Connection refused"**

- Verifica que PostgreSQL esté activo
- Verifica que el puerto 5432 esté abierto
- Verifica credenciales de conexión

### **Error: "Permission denied"**

- Verifica que el usuario tenga permisos de CREATE
- Verifica que el usuario tenga permisos de INSERT
- Verifica que la base de datos exista

### **Error: "Table does not exist"**

- Ejecuta: `npx prisma db push`
- Verifica que el esquema esté actualizado
- Verifica que las migraciones se hayan aplicado

### **Error: "Invalid DATABASE_URL"**

- Verifica el formato de la URL
- Verifica que use `postgresql://` o `postgres://`
- Verifica que incluya usuario, contraseña, host, puerto y base de datos

## 📞 Soporte

Si los problemas persisten:

1. **Ejecuta diagnóstico completo:**

   ```bash
   npm run db:diagnose
   ```

2. **Verifica logs de la aplicación**
3. **Verifica logs de la base de datos**
4. **Contacta soporte con los logs del diagnóstico**

## 🎯 Verificación Final

Después de la configuración, verifica que:

1. ✅ La aplicación carga sin errores
2. ✅ Puedes registrar usuarios
3. ✅ Puedes crear CVs
4. ✅ Los datos se guardan correctamente
5. ✅ OAuth funciona correctamente

---

**💡 Consejo:** Siempre ejecuta `npm run db:diagnose` antes de contactar soporte para obtener información detallada del problema.
