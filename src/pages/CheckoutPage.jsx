"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    direccion: "",
    ciudad: "",
    telefono: "",
  })
  const [showInvoice, setShowInvoice] = useState(false)
  const [invoiceData, setInvoiceData] = useState(null)

  const { cartItems, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const { subtotal, iva, total } = getCartTotal()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const generateInvoice = () => {
    const now = new Date()
    const invoice = {
      id: Date.now(),
      fecha: now.toLocaleDateString("es-CO"),
      hora: now.toLocaleTimeString("es-CO"),
      usuario: user,
      datosEnvio: formData,
      productos: cartItems,
      subtotal,
      iva,
      total,
    }

    // Guardar en historial de compras
    const comprasPorUsuario = JSON.parse(localStorage.getItem("compras_por_usuario") || "{}")
    if (!comprasPorUsuario[user.id]) {
      comprasPorUsuario[user.id] = []
    }
    comprasPorUsuario[user.id].push(invoice)
    localStorage.setItem("compras_por_usuario", JSON.stringify(comprasPorUsuario))

    setInvoiceData(invoice)
    setShowInvoice(true)
    clearCart()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.nombreCompleto || !formData.direccion || !formData.ciudad || !formData.telefono) {
      alert("Todos los campos son obligatorios")
      return
    }

    generateInvoice()
  }

  const handleFinish = () => {
    navigate("/")
  }

  if (showInvoice && invoiceData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-green-600 mb-2">¡Compra Realizada con Éxito!</h1>
              <p className="text-gray-600">Gracias por tu compra. Aquí tienes tu factura:</p>
            </div>

            {/* Factura */}
            <div className="border-2 border-gray-300 rounded-lg p-6 mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">FACTURA DE VENTA</h2>
                <p className="text-gray-600">Tienda 3D Interactiva</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Datos del Comprador:</h3>
                  <p>
                    <strong>Nombre:</strong> {invoiceData.datosEnvio.nombreCompleto}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {invoiceData.datosEnvio.direccion}
                  </p>
                  <p>
                    <strong>Ciudad:</strong> {invoiceData.datosEnvio.ciudad}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {invoiceData.datosEnvio.telefono}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Datos de la Compra:</h3>
                  <p>
                    <strong>Factura #:</strong> {invoiceData.id}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {invoiceData.fecha}
                  </p>
                  <p>
                    <strong>Hora:</strong> {invoiceData.hora}
                  </p>
                  <p>
                    <strong>Cliente:</strong> {invoiceData.usuario.email}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Productos Comprados:</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Producto</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Cantidad</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">Precio Unit.</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData.productos.map((item) => (
                        <tr key={item.id}>
                          <td className="border border-gray-300 px-4 py-2">{item.nombre}</td>
                          <td className="border border-gray-300 px-4 py-2 text-center">{item.cantidad}</td>
                          <td className="border border-gray-300 px-4 py-2 text-right">{formatPrice(item.precio)}</td>
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            {formatPrice(item.precio * item.cantidad)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-end">
                  <div className="w-64">
                    <div className="flex justify-between mb-2">
                      <span>Subtotal:</span>
                      <span>{formatPrice(invoiceData.subtotal)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>IVA (19%):</span>
                      <span>{formatPrice(invoiceData.iva)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span className="text-blue-600">{formatPrice(invoiceData.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleFinish}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Finalizar Compra</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario de envío */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Datos de Envío</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nombreCompleto" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="nombreCompleto"
                  name="nombreCompleto"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección *
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-1">
                  Ciudad *
                </label>
                <input
                  type="text"
                  id="ciudad"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Finalizar Compra
              </button>
            </form>
          </div>

          {/* Resumen del pedido */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen del Pedido</h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">{item.nombre}</h5>
                    <p className="text-sm text-gray-600">
                      {item.cantidad} × {formatPrice(item.precio)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatPrice(item.precio * item.cantidad)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">IVA (19%):</span>
                <span className="font-semibold">{formatPrice(iva)}</span>
              </div>

              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span className="text-blue-600">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
