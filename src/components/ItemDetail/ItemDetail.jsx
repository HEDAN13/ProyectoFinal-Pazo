import "./ItemDetail.css";
import { useNavigate } from "react-router";
import { ShoppingBasket } from "lucide-react";
import ItemCount from "../ItemCount/ItemCount";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";

export default function ItemDetail({ product }) {
  const navigate = useNavigate();
  const navigateProductDetail = () => {
    navigate(`/product-detail/${product.id}`);
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
      <ItemCount stock={product.stock} />
      <span>{product.price} $ USD</span>
      <ButtonPrimary>
        <ShoppingBasket />
        Carrito
      </ButtonPrimary>
      <ButtonPrimary onClick={navigateProductDetail}>Detalle</ButtonPrimary>
    </section>
  );
}
