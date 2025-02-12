# Impresionados 3D - Frontend

Este es el repositorio del frontend de **Impresionados 3D**, una plataforma de venta de productos personalizados impresos en 3D. Está desarrollado con **React + TypeScript** y usa **Tailwind CSS** para el diseño.

## 🚀 Instalación y ejecución

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-repositorio.git
   cd impresionados_react-nico
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:5173/` (puerto por defecto de Vite).

## 📂 Estructura del proyecto

```
impresionados_react-nico/
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── Navbar/      # Navbar y elementos relacionados
│   │   ├── Footer/      # Pie de página
│   ├── pages/           # Páginas principales
│   ├── hooks/           # Hooks personalizados
│   ├── context/         # Contextos de React
│   ├── assets/          # Imágenes y recursos estáticos
│   ├── App.tsx          # Componente principal
│   ├── main.tsx         # Punto de entrada de la app
├── public/              # Archivos estáticos
├── package.json         # Dependencias del proyecto
├── tailwind.config.js   # Configuración de Tailwind CSS
├── tsconfig.json        # Configuración de TypeScript
└── README.md            # Documentación del proyecto
```

## 🔧 Tecnologías utilizadas

- **React** + **TypeScript**
- **Vite** (para un desarrollo rápido)
- **Tailwind CSS** (estilos)
- **React Router** (navegación)
- **MongoDB** (backend gestionado por API externa en `impresionados/api`)

## ✨ Características principales

✅ Catálogo de productos con búsqueda y filtros.
✅ Sistema de autenticación de usuarios.
✅ Carrito de compras e integración con PayPal.
✅ Gestión de pedidos y personalización de productos.
✅ Uso de una **API externa** desarrollada específicamente para esta aplicación en `impresionados/api`.

## 🛠 Contribuir

1. Crea un fork del repositorio.
2. Crea una nueva rama con tu feature (`git checkout -b feature-nueva`).
3. Realiza tus cambios y haz un commit (`git commit -m "Agrega nueva funcionalidad"`).
4. Sube los cambios (`git push origin feature-nueva`).
5. Abre un pull request.

## 📜 Licencia

Este proyecto está bajo la licencia MIT. ¡Siéntete libre de contribuir! 🚀

