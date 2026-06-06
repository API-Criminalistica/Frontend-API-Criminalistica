# Frontend API-Criminalística

[![TypeScript](https://img.shields.io/badge/TypeScript-90.2%25-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2.5-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

Aplicación frontend moderna desarrollada con **React**, **TypeScript** y **Tailwind CSS** para la plataforma API-Criminalística. Esta aplicación proporciona una interfaz intuitiva para el análisis y gestión de datos criminalísticos.

**Sitio en producción:** [frontend-api-criminalistica-qylc.vercel.app](https://frontend-api-criminalistica-qylc.vercel.app/)

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Guía de Uso](#guía-de-uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Scripts Disponibles](#scripts-disponibles)
- [Configuración](#configuración)
- [Contribución](#contribución)
- [Soporte](#soporte)

---

## ✨ Características

- 🗺️ **Mapas Interactivos**: Visualización de datos geográficos con Leaflet
- 📊 **Gráficos Avanzados**: Análisis de datos con Recharts
- 🎨 **UI Moderna**: Diseño responsivo con Tailwind CSS y componentes Headless UI
- ⚡ **Rendimiento Optimizado**: Construcción rápida con Vite
- 🔒 **Type Safety**: Código completamente tipado con TypeScript
- 🌍 **Geolocalización**: Soporte para mapas con clusters y datos de calor
- 📱 **Responsive Design**: Compatible con todos los dispositivos
- 🧪 **Linting**: Validación de código con ESLint

---

## 🚀 Requisitos Previos

# FrontendCriminalistica

![Proyecto Criminalística](./public/preview.png)

Descripción

Interfaz frontend para la API de Criminalística. Aplicación construida con React + Vite y orientada a visualizar y gestionar información forense.

Requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0 o yarn >= 3.0.0
- Git

Comprueba versiones:

```bash
node --version
npm --version
```

Instalación

1) Clonar repositorio

```bash
git clone https://github.com/API-Criminalistica/Frontend-API-Criminalistica.git
cd Frontend-API-Criminalistica/FrontendCriminalistica
```

2) Instalar dependencias

Con npm:

```bash
npm install
```

Con yarn:

```bash
yarn install
```

Variables de entorno

Crea un archivo .env en la raíz del proyecto (FrontendCriminalistica/):

```env
# URL de la API
VITE_API_URL=http://localhost:3000

# Token de Mapbox (si aplica)
VITE_MAPBOX_TOKEN=tu_token_aqui
```

Asegúrate de reemplazar los valores por tus credenciales.

Uso

Desarrollo:

```bash
npm run dev
```

La app estará en http://localhost:5173

Build de producción:

```bash
npm run build
```

Previsualizar build:

```bash
npm run preview
```

Scripts útiles

- npm run dev — Modo desarrollo
- npm run build — Compilar para producción
- npm run preview — Previsualizar build
- npm run lint — Ejecutar ESLint

Estructura del proyecto

```
FrontendCriminalistica/
├── public/                 # Archivos estáticos (coloca imágenes: logo.png, preview.png)
├── src/
│   ├── components/         # Componentes React reutilizables
│   ├── pages/              # Páginas principales
│   ├── hooks/              # Hooks personalizados
│   ├── store/              # Estado global (Zustand)
│   ├── services/           # Servicios de API (Axios)
│   ├── types/              # Definiciones de tipos TypeScript
│   ├── utils/              # Funciones auxiliares
│   ├── styles/             # Estilos CSS y Tailwind
│   ├── App.tsx             # Componente principal
│   └── main.tsx            # Punto de entrada
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── postcss.config.js
```

Imágenes y activos

- Añade imágenes descriptivas en public/ (ej: preview.png, logo.png). Usa rutas relativas en el README para mostrarlas.

Tecnologías

- React + Vite
- TypeScript
- Tailwind CSS
- Axios
- Zustand
- Mapbox (opcional)

Contribuir

1. Fork
2. Crear rama: git checkout -b feature/nombre
3. Commit: git commit -m "feat: descripción"
4. Push: git push origin feature/nombre
5. Abrir Pull Request

Licencia

MIT

Contacto

Para dudas o soporte, abre un issue en el repositorio.
    TypeScript 6.0.2 - Tipado estático

Estilos

    Tailwind CSS 4.2.4 - Framework CSS utility-first
    PostCSS - Procesamiento de CSS

Componentes UI

    Headless UI - Componentes accesibles sin estilos predefinidos
    Heroicons - Iconos SVG
    Lucide React - Más iconos vectoriales

Mapas y Geolocalización

    Leaflet 1.9.4 - Librería de mapas interactivos
    React Leaflet 5.0.0 - Wrapper para React
    React Leaflet Cluster - Clustering de marcadores
    Leaflet Heat - Mapa de calor

Gráficos

    Recharts 3.8.1 - Gráficos composables

Gestión de Estado

    Zustand 5.0.12 - Estado global minimalista

HTTP Client

    Axios 1.15.2 - Cliente HTTP moderno

Herramientas de Desarrollo

    Vite 8.0.10 - Bundler ultrarrápido
    ESLint - Linting de código
    VitePress - Documentación

📜 Scripts Disponibles
Script	Descripción
npm run dev	Inicia servidor de desarrollo con Vite
npm run build	Compila TypeScript y genera build de producción
npm run lint	Valida el código con ESLint
npm run preview	Previsualiza la build de producción
⚙️ Configuración
Variables de Entorno

El proyecto utiliza variables de entorno prefijadas con VITE_. Crea un archivo .env.local para configuración local:
env

# Desarrollo
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=5000

# Producción (en .env.production)
VITE_API_URL=https://api.criminalistica.com

Tailwind CSS

El proyecto está completamente configurado con Tailwind CSS. Puedes personalizar la configuración en tailwind.config.ts.
TypeScript

La configuración de TypeScript se encuentra en tsconfig.json. El proyecto utiliza module: "esnext" y target: "ES2020" para máxima compatibilidad.
📚 Guía de Usuario Final
Acceder a la Aplicación

    Abre el navegador e ingresa a la URL de producción o local
    Autentificación (si es requerida): Introduce tus credenciales
    Dashboard Principal: Visualiza el panel de control con datos key

Funcionalidades Principales
1. Visualización de Mapas

    Haz clic en marcadores para ver detalles
    Zoom y paneo usando mouse o gestos táctiles
    Filtros para mostrar/ocultar capas

2. Análisis de Datos

    Consulta gráficos interactivos para tendencias
    Exporta datos en formato CSV o PDF
    Customiza períodos de análisis

3. Búsqueda y Filtros

    Usa la barra de búsqueda para localizar registros
    Aplica filtros avanzados por fecha, tipo, ubicación
    Guarda búsquedas frecuentes

4. Reportes

    Genera reportes automáticos
    Descarga en múltiples formatos
    Comparte con otros usuarios

🔧 Solución de Problemas
Error: "Cannot find module"
bash

# Limpia node_modules e reinstala
rm -rf node_modules
npm install

Puerto 5173 ya está en uso
bash

# Usa un puerto diferente
npm run dev -- --port 3001

Build falla con errores de TypeScript
bash

# Verifica los tipos
npm run build -- --force

Variables de entorno no se cargan

    Asegúrate que el nombre comienza con VITE_
    Reinicia el servidor de desarrollo
    Verifica que .env está en la raíz de FrontendCriminalistica/

🤝 Contribución

Para contribuir al proyecto:

    Fork el repositorio
    Crea una rama para tu feature (git checkout -b feature/AmazingFeature)
    Commit tus cambios (git commit -m 'Add some AmazingFeature')
    Push a la rama (git push origin feature/AmazingFeature)
    Abre un Pull Request

Estándares de Código

    Sigue las reglas de ESLint
    Usa TypeScript strict mode
    Escribe componentes funcionales con hooks
    Documenta funciones complejas

📝 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo LICENSE para más detalles.
💬 Soporte

¿Necesitas ayuda?

    Issues: Abre un nuevo issue
    Discussions: Participa en discusiones
    Email: Contacta al equipo de desarrollo

🎓 Recursos Útiles

    Documentación de React
    Guía de Vite
    Tailwind CSS Docs
    TypeScript Handbook
    Leaflet Documentation

👥 Equipo

Desarrollado por el equipo de API-Criminalística.