import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout/EmptyLayout";
import Products from "./pages/Products";
import CartDetail from "./pages/CartDetail";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import CartProvider from "./context/cartContext";

function App() {
  return (
    <>
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
              <Route path="/contactos" element={<Contact />} />
            </Route>
            <Route element={<EmptyLayout />}>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
