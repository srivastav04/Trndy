import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductContainer from "./pages/ProductContainer";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SignUpPage from "./pages/SignUpPage";
import OrdersPage from "./pages/OrdersPage";
import LoginPage from "./pages/LoginPage";
import './App.css';

function App() {
  const location = useLocation();
  const hideNavbar = ["/", "/signup", "/login"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-emerald-100">
      {/* Only show navbar when NOT on the root path */}
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="/product" element={<ProductContainer />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />

      </Routes>
    </div>
  );
}

export default App;
