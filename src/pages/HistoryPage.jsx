"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { History, Package, Calendar } from "lucide-react"
import { useAuth } from "../context/AuthContext"

const HistoryPage = () => {
  const [purchases, setPurchases] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const comprasPorUsuario = JSON.parse(localStorage.getItem("compras_por_usuario") || "{}")
      const userPurchases = comprasPorUsuario[user.id] || []
      // Ordenar por fecha más reciente
      const sortedPurchases = userPurchases.sort((a, b) => b.id - a.id)
      setPurchases(sortedPurchases)
    }
  }, [user])

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Debes iniciar sesión para ver tu historial</h2>
          <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    )
  }

  if (purchases.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <History className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No tienes compras realizadas</h2>
          <p className="text-gray-600 mb-8">Cuando realices tu primera compra, aparecerá aquí</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Comenzar a Comprar
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-8">
          <History className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Historial de Compras</h1>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {purchases.length} {purchases.length === 1 ? "compra" : "compras"}
          </span>
        </div>

        <div className="space-y-6">
          {purchases.map((purchase) => (
            <div key={purchase.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Header de la compra */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Pedido #{purchase.id}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {purchase.fecha} - {purchase.hora}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className="text-2xl font-bold text-blue-600">{formatPrice(purchase.total)}</span>
                  </div>
                </div>
              </div>

              {/* Datos de envío */}
              <div className="px-6 py-4 border-b bg-blue-50">
                <h4 className="font-semibold text-gray-900 mb-2">Datos de Envío:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Nombre:</span> {purchase.datosEnvio.nombreCompleto}
                  </div>
                  <div>
                    <span className="font-medium">Teléfono:</span> {purchase.datosEnvio.telefono}
                  </div>
                  <div>
                    <span className="font-medium">Dirección:</span> {purchase.datosEnvio.direccion}
                  </div>
                  <div>
                    <span className="font-medium">Ciudad:</span> {purchase.datosEnvio.ciudad}
                  </div>
                </div>
              </div>

              {/* Productos comprados */}
              <div className="px-6 py-4">
                <h4 className="font-semibold text-gray-900 mb-4">Productos Comprados:</h4>
                <div className="space-y-3">
                  {purchase.productos.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.imagen || "/placeholder.svg"}
                        alt={item.nombre}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{item.nombre}</h5>
                        <p className="text-sm text-gray-600">
                          Cantidad: {item.cantidad} × {formatPrice(item.precio)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatPrice(item.precio * item.cantidad)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Resumen de precios */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-end">
                    <div className="w-64 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal:</span>
                        <span>{formatPrice(purchase.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">IVA (19%):</span>
                        <span>{formatPrice(purchase.iva)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span>Total:</span>
                        <span className="text-blue-600">{formatPrice(purchase.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HistoryPage
