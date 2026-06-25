# ChatBot Wizy - Frontend

Aplicación Frontend construida con **Next.js (App Router)** y **Material UI**, implementando una arquitectura **MVVM (Model-View-ViewModel)**. Este cliente se conecta al backend (NestJS) para interactuar con un asistente de IA impulsado por OpenAI.

## 🚀 Características
- **Arquitectura MVVM**: Clara separación entre Vistas, Estado/Lógica (ViewModels) y Modelos.
- **Context API + Persistencia**: El historial del chat se guarda en memoria caché (`localStorage`), permitiendo recargar la página sin perder la conversación.
- **Markdown Inteligente**: Interpreta respuestas en Markdown generadas por la IA, renderizando hipervínculos (hacia Shopify) e imágenes de productos directamente en el chat usando `react-markdown`.
- **Diseño Minimalista y Responsivo**: Construido 100% con Material UI, adaptándose perfectamente a dispositivos móviles y escritorio.

## ⚙️ Estructura del Proyecto
- `/doc`: Documentación de la arquitectura.
- `/src/models`: Interfaces TypeScript de los datos.
- `/src/context`: React Context para el estado global de la sesión.
- `/src/services`: Peticiones HTTP al backend.
- `/src/viewModels`: Custom Hooks que orquestan el Contexto y el Servicio.
- `/src/views`: Componentes visuales reutilizables (`ChatComponent`).

## 🛠️ Instalación y Ejecución

1. Instala las dependencias:
```bash
npm install
```

2. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) (o el puerto que asigne Next.js, comúnmente 3001 si el backend ya usa el 3000) en tu navegador.
> **Nota:** Asegúrate de que el Backend de NestJS (`chatBotWizyApi`) esté corriendo en el puerto 3000 antes de interactuar con el chat.
