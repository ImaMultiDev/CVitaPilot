#!/bin/bash

# 🚀 CVitaPilot Deployment Script
# Utilidades para despliegue en Vercel + Railway

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para logging
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

# Verificar dependencias
check_dependencies() {
    log "Verificando dependencias..."
    
    if ! command -v npm &> /dev/null; then
        error "npm no está instalado"
    fi
    
    if ! command -v npx &> /dev/null; then
        error "npx no está instalado"
    fi
    
    success "Dependencias verificadas"
}

# Limpiar y preparar
clean_build() {
    log "Limpiando build anterior..."
    rm -rf .next
    rm -rf node_modules/.cache
    success "Build limpio completado"
}

# Instalar dependencias
install_deps() {
    log "Instalando dependencias..."
    npm ci
    success "Dependencias instaladas"
}

# Generar cliente Prisma
generate_prisma() {
    log "Generando cliente Prisma..."
    npx prisma generate
    success "Cliente Prisma generado"
}

# Verificar TypeScript
check_typescript() {
    log "Verificando TypeScript..."
    npm run type-check
    success "TypeScript verificado"
}

# Verificar ESLint
check_lint() {
    log "Verificando ESLint..."
    npm run lint
    success "ESLint verificado"
}

# Build de producción
build_production() {
    log "Construyendo para producción..."
    npm run build
    success "Build de producción completado"
}

# Test de conexión a base de datos
test_database() {
    log "Testeando conexión a base de datos..."
    if [ -n "$DATABASE_URL" ]; then
        npx prisma db push --preview-feature
        success "Conexión a base de datos verificada"
    else
        warning "DATABASE_URL no configurada, saltando test de DB"
    fi
}

# Función principal
main() {
    echo "🚀 CVitaPilot Deployment Script"
    echo "================================"
    
    case "$1" in
        "check")
            check_dependencies
            check_typescript
            check_lint
            ;;
        "clean")
            clean_build
            ;;
        "build")
            check_dependencies
            clean_build
            install_deps
            generate_prisma
            check_typescript
            check_lint
            build_production
            ;;
        "db")
            test_database
            ;;
        "full")
            check_dependencies
            clean_build
            install_deps
            generate_prisma
            test_database
            check_typescript
            check_lint
            build_production
            success "🎉 Despliegue completo listo!"
            ;;
        *)
            echo "Uso: $0 {check|clean|build|db|full}"
            echo ""
            echo "Comandos disponibles:"
            echo "  check  - Verificar dependencias y código"
            echo "  clean  - Limpiar builds anteriores"
            echo "  build  - Build completo sin DB"
            echo "  db     - Testear conexión a base de datos"
            echo "  full   - Proceso completo de despliegue"
            exit 1
            ;;
    esac
}

main "$@" 