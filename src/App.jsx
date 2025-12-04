import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout/EmptyLayout";
import Products from "./pages/Products";
import CartDetail from "./pages/CartDetail/CartDetail";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import CartProvider from "./context/cartContext";
import UserProvider from "./context/UserContext";
import Login from "./pages/login/login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <>
      <UserProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Products />} />
                <Route path="/category/:categoria" element={<Products />} />
                <Route path="/cart-detail" element={<CartDetail />} />
                <Route
                  path="/product-detail/:productId"
                  element={<ProductDetail />}
                />
                <Route path="/mis-compras" element={<Checkout />} />
              </Route>
              <Route element={<EmptyLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </UserProvider>
    </>
  );
}

export default App;
