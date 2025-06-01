"use client"

import { Link } from "react-router-dom"
import { Heart, ShoppingCart } from "lucide-react"
import { useFavorites } from "../context/FavoritesContext"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavorites()
  const { addToCart } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    // Cargar model-viewer script si no está cargado
    if (!window.customElements.get("model-viewer")) {
      const script = document.createElement("script")
      script.type = "module"
      script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
      document.head.appendChild(script)
    }
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    alert("Producto agregado al carrito")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Debes iniciar sesión para ver tus favoritos</h2>
          <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No tienes productos favoritos</h2>
          <p className="text-gray-600 mb-8">Agrega productos a tus favoritos para verlos aquí</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Explorar Productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-8">
          <Heart className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-bold text-gray-900">Mis Favoritos</h1>
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            {favorites.length} {favorites.length === 1 ? "producto" : "productos"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/producto/${product.id}`}>
                <div className="relative">
                  {/* Visualización 3D en lugar de imagen */}
                  <div className="w-full h-48 bg-gray-100">
                    <model-viewer
                      src={product.modelo}
                      alt={product.nombre}
                      auto-rotate
                      camera-controls
                      disable-zoom
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "0",
                      }}
                      loading="lazy"
                      interaction-prompt="none"
                      ar-modes=""
                    ></model-viewer>
                  </div>
                </div>
              </Link>

              <div className="p-4">
                <Link to={`/producto/${product.id}`}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                    {product.nombre}
                  </h3>
                </Link>

                <p className="text-2xl font-bold text-blue-600 mb-4">{formatPrice(product.precio)}</p>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Agregar</span>
                  </button>

                  <button
                    onClick={() => removeFromFavorites(product.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FavoritesPage
