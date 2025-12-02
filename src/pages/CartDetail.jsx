import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cartContext";
import { getProducts } from "../components/async";

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

  return (
    <div>
      <p>Carrito</p>
      {cart.map((cartProduct) => {
        const dataProduct = products.find(
          (product) => product.id === cartProduct.id
        );
        return (
          <div key={cartProduct.id}>
            <h3>{dataProduct?.title}</h3>
            <span>{dataProduct?.price} $ USD</span>
            <span>Cantidad: {cartProduct?.quantity}</span>
          </div>
        );
      })}
    </div>
  );
}
