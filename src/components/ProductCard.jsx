"use client"

import { Link } from "react-router-dom"
import { ShoppingCart, Heart } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useFavorites } from "../context/FavoritesContext"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
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

  const handleAddToCart = (e) => {
    e.preventDefault()
    if (!user) {
      alert("Debes iniciar sesión para agregar productos al carrito")
      return
    }
    addToCart(product)
  }

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    if (!user) {
      alert("Debes iniciar sesión para agregar productos a favoritos")
      return
    }
    toggleFavorite(product)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
              progress-bar="hide"
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
          <div className="absolute top-2 right-2">
            <button
              onClick={handleToggleFavorite}
              className={`p-2 rounded-full transition-colors ${
                isFavorite(product.id) ? "bg-red-500 text-white" : "bg-white text-gray-600 hover:text-red-500"
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite(product.id) ? "fill-current" : ""}`} />
            </button>
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

        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Agregar al Carrito</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
