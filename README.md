# Tienda 3D Interactiva

Una tienda virtual moderna con visualización 3D de productos, desarrollada con React + Vite.

## Autores
- [Tu Nombre]
- [Nombre del compañero si aplica]

## Características

### ✅ Funcionalidades Implementadas

1. **Autenticación Local (10%)**
   - Registro e inicio de sesión con localStorage
   - Usuario mostrado en navbar
   - Mantiene sesión tras recarga
   - Cerrar sesión

2. **Catálogo de Productos (10%)**
   - Carga productos desde data.js
   - Muestra nombre, precio e imagen
   - Botón para agregar al carrito
   - Diseño responsivo profesional

3. **Vista Detallada del Producto (20%)**
   - Ruta `/producto/:id`
   - Visualización 3D con `<model-viewer>`
   - Nombre, descripción, precio
   - Botón para comprar y agregar a favoritos

4. **Carrito de Compras (15%)**
   - Productos con cantidad editable
   - Eliminar productos
   - Cálculo de subtotal, IVA y total
   - Persistencia en localStorage

5. **Formulario de Envío + Factura (20%)**
   - Solicita datos de envío completos
   - Genera factura detallada
   - Incluye fecha, hora y datos del comprador
   - Lista de productos con precios y total

6. **Sistema de Favoritos (10%)**
   - Agregar/quitar productos favoritos
   - Vista `/favoritos` dedicada
   - Indicador visual en productos

7. **Historial de Compras (10%)**
   - Guarda pedidos en localStorage
   - Historial organizado por fecha
   - Muestra productos comprados y datos de envío

8. **Diseño y Navegación (5%)**
   - Navbar con todas las secciones
   - Diseño responsivo (desktop y móvil)
   - Estética moderna con Tailwind CSS

## Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de construcción rápida
- **React Router DOM** - Enrutamiento
- **Tailwind CSS** - Framework de CSS
- **Lucide React** - Iconos
- **Model Viewer** - Visualización 3D
- **Context API** - Gestión de estado global
- **localStorage** - Persistencia de datos

## Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos para ejecutar

1. **Clonar el repositorio**
   \`\`\`bash
   git clone [URL_DEL_REPOSITORIO]
   cd tienda-3d-interactiva
   \`\`\`

2. **Instalar dependencias**
   \`\`\`bash
   npm install
   \`\`\`

3. **Ejecutar en modo desarrollo**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Abrir en el navegador**
   - La aplicación se abrirá automáticamente en `http://localhost:3000`

### Comandos disponibles

- `npm run dev` - Ejecuta la aplicación en modo desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la construcción de producción
- `npm run lint` - Ejecuta el linter para verificar el código

## Estructura del Proyecto

\`\`\`
src/
├── components/          # Componentes reutilizables
│   ├── Auth/           # Componentes de autenticación
│   ├── Navbar.jsx      # Barra de navegación
│   └── ProductCard.jsx # Tarjeta de producto
├── context/            # Contextos de React
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   └── FavoritesContext.jsx
├── data/               # Datos de la aplicación
│   └── data.js         # Productos disponibles
├── pages/              # Páginas principales
│   ├── Home.jsx
│   ├── ProductDetailPage.jsx
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx
│   ├── FavoritesPage.jsx
│   └── HistoryPage.jsx
├── App.jsx             # Componente principal
├── main.jsx           # Punto de entrada
└── index.css          # Estilos globales
\`\`\`

## Funcionalidades Detalladas

### Autenticación
- Sistema completo de registro e inicio de sesión
- Validación de formularios
- Persistencia de sesión
- Protección de rutas que requieren autenticación

### Carrito de Compras
- Agregar productos con cantidad
- Modificar cantidades
- Eliminar productos
- Cálculo automático de totales con IVA
- Persistencia por usuario

### Visualización 3D
- Integración con Google Model Viewer
- Modelos 3D interactivos
- Controles de cámara (rotar, zoom)
- Carga progresiva de modelos

### Sistema de Favoritos
- Marcar/desmarcar productos favoritos
- Vista dedicada para favoritos
- Indicadores visuales
- Persistencia por usuario

### Generación de Facturas
- Facturas completas con todos los datos
- Información del comprador y envío
- Detalle de productos y precios
- Cálculos de impuestos

### Historial de Compras
- Registro completo de todas las compras
- Organización cronológica
- Detalles de productos y envío
- Búsqueda y filtrado

## Demo en Línea

🚀 **[Ver Demo en Vercel](https://tu-proyecto.vercel.app)**

## Notas Técnicas

- La aplicación usa localStorage para simular una base de datos
- Los modelos 3D se cargan desde la carpeta `/public/model/`
- El diseño es completamente responsivo
- Se incluyen animaciones y transiciones suaves
- Optimizado para rendimiento y experiencia de usuario

## Próximas Mejoras

- [ ] Integración con base de datos real
- [ ] Sistema de pagos
- [ ] Notificaciones push
- [ ] Chat de soporte
- [ ] Búsqueda avanzada de productos
- [ ] Sistema de reseñas y calificaciones

---

**Desarrollado con ❤️ para el examen final**
