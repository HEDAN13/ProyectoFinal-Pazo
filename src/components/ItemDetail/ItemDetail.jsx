import "./ItemDetail.css";
import { useNavigate } from "react-router";
import { ShoppingBasket } from "lucide-react";
import ItemCount from "../ItemCount/ItemCount";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import { useContext, useState } from "react";
import { CartContext } from "../../context/cartContext";
import useCount from "../../hooks/useCount";
import { confirmarAgregarProducto, mostrarToastExito } from "../notificaciones";

export default function ItemDetail({ product }) {
  const navigate = useNavigate();
  const navigateProductDetail = () => {
    navigate(`/product-detail/${product.id}`);
  };
  const { addCartProduct, totalQuantity } = useContext(CartContext);
  const { count, remove, add } = useCount({ initial: 1, stock: product.stock });
  const [esVisible, setEsVisible] = useState(true);

  const handleAddCartProduct = async () => {
    const resultado = await confirmarAgregarProducto(product.title);
    if (resultado.isDenied || resultado.isDismissed) return;

    const newCartProduct = {
      id: product.id,
      quantity: count,
    };
    if (totalQuantity + count <= product.stock) {
      addCartProduct(newCartProduct);
      setEsVisible(false);
      mostrarToastExito(`Se ha agregado ${product.title} al carrito.`);
    }
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
      {esVisible && <ItemCount count={count} add={add} remove={remove} />}
      <span>{product.price} $ USD</span>
      <div className="itemDetail-buttons">
        <ButtonPrimary onClick={handleAddCartProduct} disabled={!esVisible}>
          <ShoppingBasket />
          Carrito
        </ButtonPrimary>
        <ButtonPrimary onClick={navigateProductDetail}>Detalle</ButtonPrimary>
      </div>
    </section>
  );
}
