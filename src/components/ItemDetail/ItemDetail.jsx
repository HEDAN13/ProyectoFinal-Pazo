import "./ItemDetail.css";
import { useNavigate } from "react-router";
import { ShoppingBasket } from "lucide-react";
import ItemCount from "../ItemCount/ItemCount";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import useCount from "../../hooks/useCount";

export default function ItemDetail({ product }) {
  const navigate = useNavigate();
  const navigateProductDetail = () => {
    navigate(`/product-detail/${product.id}`);
  };
  const { addCartProduct } = useContext(CartContext);
  const { count, remove, add } = useCount({ initial: 1, stock: product.stock });

  const handleAddCartProduct = () => {
    const newCartProduct = {
      id: product.id,
      quantity: count,
    };
    addCartProduct(newCartProduct);
  };

  return (
    <section className="itemDetail">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="itemDetail-image"
      />
      <h3 className="itemDetail-title">{product.title}</h3>
      <p className="itemDetail-description">{product.description}</p>
      <ItemCount count={count} add={add} remove={remove} />
      <span>{product.price} $ USD</span>
      <div className="itemDetail-buttons">
        <ButtonPrimary onClick={handleAddCartProduct}>
          <ShoppingBasket />
          Carrito
        </ButtonPrimary>
        <ButtonPrimary onClick={navigateProductDetail}>Detalle</ButtonPrimary>
      </div>
    </section>
  );
}
