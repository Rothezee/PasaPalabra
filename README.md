# 🎯 Pasapalabra - Juego del Rosco

Una implementación moderna y elegante del famoso juego de televisión "Pasapalabra" desarrollada con React, TypeScript y Tailwind CSS. Perfecto para jugar en grupo con amigos y familia.

![Pasapalabra Game](https://img.shields.io/badge/Game-Pasapalabra-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Características

### 🎮 Experiencia de Juego
- **Rosco visual interactivo** con indicadores de estado en tiempo real
- **Timer configurable** de 1 a 60 minutos
- **Sistema de puntuación** con estadísticas detalladas
- **Transiciones suaves** y animaciones fluidas
- **Diseño responsive** para cualquier dispositivo

### 📚 Sistema de Preguntas
- **130+ preguntas incluidas** (5 por cada letra del alfabeto)
- **Selección aleatoria** para mayor rejugabilidad
- **Preguntas personalizadas** - Agrega tus propias palabras
- **Múltiples categorías**: Animales, Deportes, Lugares, Tecnología, etc.
- **Respuestas visibles** para facilitar el juego en grupo

### ⚙️ Configuración Avanzada
- **Tiempo personalizable** para partidas cortas o largas
- **Editor de preguntas** con interfaz intuitiva
- **Persistencia de configuración** usando localStorage
- **Validación de datos** para evitar errores

## 🚀 Demo en Vivo

Puedes jugar ahora mismo en: **[https://jazzy-syrniki-0f1a5c.netlify.app](https://jazzy-syrniki-0f1a5c.netlify.app)**

## 📱 Capturas de Pantalla

### Pantalla Principal
- Interfaz elegante con gradientes modernos
- Configuración actual visible
- Botones de acción con efectos hover

### Configuración
- Editor de tiempo de juego
- Formulario para agregar preguntas personalizadas
- Lista de preguntas existentes con opciones de edición

### Juego
- Rosco circular con 26 letras
- Área de pregunta con categoría y pista
- Botones de respuesta: Correcto, Incorrecto, Pasapalabra
- Panel lateral con estadísticas en tiempo real

### Resultados
- Puntuación final y porcentaje
- Tiempo utilizado
- Opción de reiniciar o volver al menú

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca de interfaz de usuario
- **TypeScript 5.5.3** - Tipado estático para JavaScript
- **Tailwind CSS 3.4.1** - Framework de CSS utilitario
- **Lucide React** - Iconos modernos y elegantes

### Herramientas de Desarrollo
- **Vite 5.4.2** - Bundler y servidor de desarrollo
- **ESLint** - Linter para mantener calidad de código
- **PostCSS** - Procesador de CSS
- **Autoprefixer** - Prefijos CSS automáticos

## 🏗️ Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación Local

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/pasapalabra-game.git
cd pasapalabra-game
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run preview  # Vista previa de la build
npm run lint     # Ejecutar ESLint
```

## 🎯 Cómo Jugar

### Modo Grupo (Recomendado)
1. **Una persona maneja el dispositivo** como moderador
2. **Lee las preguntas en voz alta** al grupo
3. **Los participantes responden oralmente**
4. **El moderador marca** Correcto/Incorrecto/Pasapalabra
5. **Continúa hasta completar el rosco** o que se acabe el tiempo

### Configuración Previa
1. **Ajusta el tiempo** según la dificultad deseada
2. **Agrega preguntas personalizadas** para temas específicos
3. **Inicia el juego** y ¡diviértanse!

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── HomePage.tsx     # Pantalla principal
│   ├── SettingsPage.tsx # Configuración
│   ├── GameRoom.tsx     # Sala de juego
│   └── PasapalabraWheel.tsx # Rosco visual
├── data/
│   └── questions.ts     # Base de datos de preguntas
├── types/
│   └── game.ts         # Tipos TypeScript
├── App.tsx             # Componente principal
├── main.tsx           # Punto de entrada
└── index.css          # Estilos globales
```

## 🎨 Personalización

### Agregar Nuevas Preguntas
```typescript
// En src/data/questions.ts
{
  letter: 'A',
  clue: 'Tu pista aquí',
  answer: 'TU_RESPUESTA',
  category: 'Tu Categoría'
}
```

### Modificar Colores
Los colores se pueden cambiar en `tailwind.config.js` o directamente en los componentes usando las clases de Tailwind.

### Ajustar Tiempos
Los tiempos de transición se pueden modificar en `GameRoom.tsx`:
```typescript
// Tiempo después de respuesta correcta/incorrecta
setTimeout(() => nextQuestion(), 1000);

// Tiempo después de pasapalabra
setTimeout(() => nextQuestion(), 500);
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Ideas para Contribuir
- 🌍 Soporte multiidioma
- 🎵 Efectos de sonido
- 📊 Sistema de rankings
- 🎨 Temas personalizables
- 📱 Modo multijugador online
- 🔊 Síntesis de voz para las preguntas

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado con ❤️ para la comunidad de jugadores.

## 🙏 Agradecimientos

- Inspirado en el programa de televisión "Pasapalabra"
- Iconos por [Lucide](https://lucide.dev/)
- Hosting por [Netlify](https://netlify.com/)
- Construido con [Vite](https://vitejs.dev/)

---

⭐ **¡Si te gusta el proyecto, dale una estrella!** ⭐

🎮 **¡Diviértete jugando!** 🎮
