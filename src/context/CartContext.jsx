"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`)
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    } else {
      setCartItems([])
    }
  }, [user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems))
    }
  }, [cartItems, user])

  const addToCart = (product) => {
    // Asegurarse de que no se incluya la propiedad 'imagen' si existe
    const { imagen, ...productWithoutImage } = product

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item))
      }
      return [...prev, { ...productWithoutImage, cantidad: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, cantidad) => {
    if (cantidad <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, cantidad } : item)))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0)
    const iva = subtotal * 0.19
    return { subtotal, iva, total: subtotal + iva }
  }

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.cantidad, 0)
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
