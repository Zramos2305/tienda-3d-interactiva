import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { FavoritesProvider } from "./context/FavoritesContext"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import ProductDetailPage from "./pages/ProductDetailPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import FavoritesPage from "./pages/FavoritesPage"
import HistoryPage from "./pages/HistoryPage"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/producto/:id" element={<ProductDetailPage />} />
                <Route path="/carrito" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/favoritos" element={<FavoritesPage />} />
                <Route path="/historial" element={<HistoryPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </Router>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
