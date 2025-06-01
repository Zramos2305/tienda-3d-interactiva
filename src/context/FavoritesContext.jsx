"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"

const FavoritesContext = createContext()

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`)
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      }
    } else {
      setFavorites([])
    }
  }, [user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites))
    }
  }, [favorites, user])

  const addToFavorites = (product) => {
    setFavorites((prev) => {
      if (!prev.find((item) => item.id === product.id)) {
        return [...prev, product]
      }
      return prev
    })
  }

  const removeFromFavorites = (productId) => {
    setFavorites((prev) => prev.filter((item) => item.id !== productId))
  }

  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId)
  }

  const toggleFavorite = (product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
