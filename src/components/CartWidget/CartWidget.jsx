import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { Link } from "react-router";
import "./CartWidget.css";

function CartWidget() {
  const { totalQuantity } = useContext(CartContext);

  return (
    <Link to="/cart-detail">
      <div className="cartWidget text-center">
        <img
          src="/Carrito.png"
          alt="Logo de carrito de compras"
          width="auto"
          height="50"
        />
        <span className="counter">{totalQuantity}</span>
      </div>
    </Link>
  );
}

export default CartWidget;
