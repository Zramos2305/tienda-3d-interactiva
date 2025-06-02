"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { ShoppingCart, Heart, ArrowLeft } from "lucide-react"
import { productos } from "../data/data"
import { useCart } from "../context/CartContext"
import { useFavorites } from "../context/FavoritesContext"
import { useAuth } from "../context/AuthContext"

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { user } = useAuth()

  useEffect(() => {
    const foundProduct = productos.find((p) => p.id === Number.parseInt(id))
    setProduct(foundProduct)
  }, [id])

  useEffect(() => {
    // Cargar model-viewer script
    const script = document.createElement("script")
    script.type = "module"
    script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const handleAddToCart = () => {
    if (!user) {
      alert("Debes iniciar sesión para agregar productos al carrito")
      return
    }
    addToCart(product)
    alert("Producto agregado al carrito")
  }

  const handleToggleFavorite = () => {
    if (!user) {
      alert("Debes iniciar sesión para agregar productos a favoritos")
      return
    }
    toggleFavorite(product)
  }

  const handleBuyNow = () => {
    if (!user) {
      alert("Debes iniciar sesión para comprar")
      return
    }
    addToCart(product)
    navigate("/carrito")
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h2>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a productos</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Modelo 3D */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Vista 3D Interactiva</h3>
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <model-viewer
                src={product.modelo}
                alt={product.nombre}
                auto-rotate
                camera-controls
                progress-bar="hide"
                style={{ width: "100%", height: "100%" }}
                loading="lazy"
              >
                <div slot="progress-bar" className="progress-bar">
                  <div className="update-bar"></div>
                </div>
              </model-viewer>
            </div>
            <p className="text-sm text-gray-600 mt-2">Usa el mouse para rotar y hacer zoom en el modelo 3D</p>
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.nombre}</h1>
              <p className="text-4xl font-bold text-blue-600 mb-6">{formatPrice(product.precio)}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
              <p className="text-gray-700 leading-relaxed">{product.descripcion}</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleBuyNow}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Comprar Ahora
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center space-x-2 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Agregar al Carrito</span>
                </button>

                <button
                  onClick={handleToggleFavorite}
                  className={`flex items-center justify-center space-x-2 py-3 px-6 rounded-lg transition-colors ${
                    isFavorite(product.id)
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite(product.id) ? "fill-current" : ""}`} />
                  <span>{isFavorite(product.id) ? "En Favoritos" : "Agregar a Favoritos"}</span>
                </button>
              </div>
            </div>

            {/* Características del producto */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Características</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Material de alta calidad</li>
                <li>• Diseño moderno y funcional</li>
                <li>• Fácil instalación</li>
                <li>• Garantía de 2 años</li>
                <li>• Envío gratuito</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
