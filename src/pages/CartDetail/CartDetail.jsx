import { useContext, useEffect, useMemo, useState } from "react";
import { CartContext } from "../../context/cartContext";
import { getProducts } from "../../components/async";
import "./CartDetail.css";

export default function CartDetail() {
  const { cart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const total = useMemo(() => {
    return cart.reduce((acc, cartProduct) => {
      const dataProduct = products.find(
        (product) => product.id === cartProduct.id
      );
      const price = Number(dataProduct?.price ?? 0);
      const qty = Number(cartProduct?.quantity ?? 0);
      return acc + price * qty;
    }, 0);
  }, [cart, products]);

  return (
    <div className="cartdetail">
      <h2 className="cartdetail-title">Carrito</h2>
      {cart.map((cartProduct) => {
        const dataProduct = products.find(
          (product) => product.id === cartProduct.id
        );
        return (
          <div key={cartProduct.id} className="cartdetail-container">
            <h3 className="cartdetail-name">{dataProduct?.title}</h3>
            <span className="cartdetail-price">{dataProduct?.price} $ USD</span>
            <span className="cartdetail-qty">
              Cantidad: {cartProduct?.quantity}
            </span>
            <span className="cartdetail-sub">
              Subtotal:{" "}
              {(dataProduct?.price * cartProduct?.quantity).toFixed(2)} $USD
            </span>
          </div>
        );
      })}
      <div className="cartdetail-total">
        <strong>Total: {total.toFixed(2)} $ USD</strong>
      </div>
    </div>
  );
}
