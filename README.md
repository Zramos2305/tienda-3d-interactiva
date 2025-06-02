# Tienda 3D Interactiva

Una tienda virtual moderna con visualización 3D de productos, desarrollada con React + Vite.

## Hecho por 
- ZAYRA RAMOS 
- SEBASTIAN ECHEVERRI 

## Enlaces del Proyecto

- **Demo en Vivo**: [https://tienda-3d-interactiva-git-main-zramos2305s-projects.vercel.app](https://tu-proyecto.vercel.app)
- **Repositorio GitHub**: [https://github.com/Zramos2305/tienda-3d-interactiva](https://github.com/TU_USUARIO/tienda-3d-interactiva)

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
## Notas Técnicas
- La aplicación usa localStorage para simular una base de datos
- Los modelos 3D se cargan desde la carpeta `/public/model/`
- El diseño es completamente responsivo
- Se incluyen animaciones y transiciones suaves
- Optimizado para rendimiento y experiencia de usuario
