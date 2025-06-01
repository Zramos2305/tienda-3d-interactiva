"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const foundUser = users.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const userSession = { id: foundUser.id, email: foundUser.email, nombre: foundUser.nombre }
      setUser(userSession)
      localStorage.setItem("user", JSON.stringify(userSession))
      return true
    }
    return false
  }

  const register = (nombre, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    if (users.find((u) => u.email === email)) {
      return false // Usuario ya existe
    }

    const newUser = {
      id: Date.now(),
      nombre,
      email,
      password,
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    const userSession = { id: newUser.id, email: newUser.email, nombre: newUser.nombre }
    setUser(userSession)
    localStorage.setItem("user", JSON.stringify(userSession))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
