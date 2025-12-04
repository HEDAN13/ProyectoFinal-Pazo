# ProyectoFinal+Pazo — Documentación del Proyecto

## Resumen General

**ProyectoFinal+Pazo** es una aplicación de e-commerce desarrollada con **React + Vite** que permite a los usuarios:

- Navegar un catálogo de productos filtrable por categorías
- Ver detalles de cada producto
- Agregar productos al carrito
- Finalizar compras y visualizar historial de pedidos
- Cambiar entre modo claro y oscuro

La aplicación utiliza **Firebase** para autenticación, almacenamiento de productos y pedidos, y **Bootstrap** para estilos responsivos.

---

## Estructura del Proyecto

### `/src`

Carpeta raíz que contiene toda la lógica y componentes de la aplicación.

#### **Archivos principales**

- **`main.jsx`** — Punto de entrada. Configura React, proveedores (ThemeProvider) y monta la app.
- **`App.jsx`** — Componente raíz. Define rutas principales y layouts.
- **`firebaseConfig.js`** — Configuración e inicialización de Firebase.
- **`index.css`** — Estilos globales, variables CSS para tema (claro/oscuro).

---

### `/components` — Componentes Reutilizables

| Componente            | Función                                                              |
| --------------------- | -------------------------------------------------------------------- |
| **NavBar**            | Barra de navegación con menú de categorías, carrito y autenticación. |
| **ButtonPrimary**     | Botón personalizado reutilizable.                                    |
| **ButtonTheme**       | Toggle para cambiar tema (claro/oscuro).                             |
| **CartWidget**        | Icono de carrito con contador de productos.                          |
| **CategoryListMenu**  | Menú desplegable de categorías (dropdown).                           |
| **ItemCount**         | Selector de cantidad (incrementar/decrementar).                      |
| **ItemDetail**        | Card de producto con imagen, título, precio y opciones de compra.    |
| **ItemListContainer** | Contenedor que lista y filtra productos por categoría.               |
| **CheckoutContainer** | Historial de compras del usuario (accordion con detalles).           |
| **CheckoutDetail**    | Detalle expandible de cada pedido (acordeón).                        |
| **Loading**           | Spinner/indicador de carga.                                          |
| **NotFoundComponent** | Página 404 personalizada.                                            |

#### **Otros archivos**

- **`async.js`** — Funciones para obtener datos desde Firebase (productos, carritos, categorías).
- **`notificaciones.js`** — Funciones para mostrar toasts y alertas (SweetAlert2).

---

### `/context` — Contextos Globales (State Management)

| Contexto             | Responsabilidad                                           |
| -------------------- | --------------------------------------------------------- |
| **ThemeContext.jsx** | Gestiona modo claro/oscuro. Persiste en localStorage.     |
| **CartContext.jsx**  | Gestiona carrito de compras (agregar, eliminar, limpiar). |
| **UserContext.jsx**  | Gestiona usuario autenticado y datos de sesión.           |

---

### `/hooks` — Hooks Personalizados

| Hook             | Función                                                                       |
| ---------------- | ----------------------------------------------------------------------------- |
| **useCount.jsx** | Maneja el contador de cantidad (incrementar/decrementar con límite de stock). |

---

### `/layouts` — Estructuras de Página

| Layout          | Uso                                                     |
| --------------- | ------------------------------------------------------- |
| **MainLayout**  | Incluye NavBar + contenido (para páginas autenticadas). |
| **EmptyLayout** | Solo contenido sin navegación (para Login/Register).    |

---

### `/pages` — Páginas (Vistas Principales)

| Página                | Ruta           | Descripción                                                |
| --------------------- | -------------- | ---------------------------------------------------------- |
| **Products.jsx**      | `/`            | Catálogo principal de productos.                           |
| **ProductDetail.jsx** | `/product/:id` | Detalle de un producto con galería e info completa.        |
| **CartDetail.jsx**    | `/carrito`     | Carrito con listado de items y opción de finalizar compra. |
| **Checkout.jsx**      | `/checkout`    | Historial de compras del usuario (acordeón).               |
| **Login.jsx**         | `/login`       | Formulario de inicio de sesión.                            |
| **Register.jsx**      | `/register`    | Formulario de registro.                                    |
| **NotFound.jsx**      | `/*`           | Página 404.                                                |

---

## Funcionalidades Principales

### 1. Autenticación

- Registro e inicio de sesión con **Firebase Auth**.
- Persistencia de usuario en **localStorage** y **UserContext**.

### 2. Catálogo de Productos

- Obtiene productos desde **Firestore** (colección `items`).
- Filtrado por categoría vía **useParams**.
- Card con imagen (thumbnail), título, descripción y precio.

### 3. Carrito de Compras

- Agregar/eliminar productos.
- Validación de stock (no permite exceder disponibilidad).
- Toast de confirmación antes de agregar.
- Persiste en **CartContext** (sesión actual).

### 4. Checkout

- Solicita confirmación del usuario antes de finalizar compra.
- Guarda pedido en Firestore (colección `cart`).
- Historial de compras con acordeón Bootstrap.
- Muestra fecha, cantidad, precio total y detalles de items.

### 5. Tema (Claro/Oscuro)

- Toggle en **NavBar** via **ButtonTheme**.
- Usa variables CSS (--primary-color, --primary-text-color).
- Persiste preferencia en **localStorage**.
- Aplica clase `.dark-theme` en `<html>`.

---

## Tecnologías Usadas

| Tecnología          | Propósito                                             |
| ------------------- | ----------------------------------------------------- |
| **React 18**        | Framework principal.                                  |
| **Vite**            | Bundler/dev server.                                   |
| **React Router v6** | Navegación entre rutas.                               |
| **Firebase**        | Autenticación, Firestore (base datos), hosting.       |
| **Bootstrap 5**     | Estilos, grid, componentes (accordion, navbar, etc.). |
| **SweetAlert2**     | Modales y alertas personalizadas.                     |
| **Lucide React**    | Iconos (Sun, Moon, Trash2, ShoppingBasket, etc.).     |
| **CSS Variables**   | Gestión dinámica de temas.                            |

---

## Instalación y Ejecución

```bash
# 1. Clonar repositorio
git clone https://github.com/HEDAN13/ProyectoFinal-Pazo.git

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env
# Añadir configuración de Firebase

# 4. Ejecutar en desarrollo
npm run dev
```

**Última actualización:** Diciembre 2025
**Autor:** HEDAN13 - Héctor Daniel Pazo
**Comisión:** 81720 — Coder House
