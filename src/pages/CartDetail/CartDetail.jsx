import { useContext, useEffect, useMemo, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { getProducts, guardarCarrito } from "../../components/async";
import "./CartDetail.css";
import ButtonPrimary from "../../components/ButtonPrimary/ButtonPrimary";
import { Trash2, TreePalm } from "lucide-react";
import {
  confirmarCompra,
  confirmarEliminarProducto,
  mostrarToastError,
  mostrarToastExito,
} from "../../components/notificaciones";
import { UserContext } from "../../context/UserContext";
import Loading from "../../components/Loading/Loading";

export default function CartDetail() {
  const { cart, deleteCartProduct, deleteAllCartProducts } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        mostrarToastError(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setTimeout(() => {
        setIsLoadingCart(false);
      }, 800);
    }
  }, [products]);

  const handleRemoveItem = async (item) => {
    const resultado = await confirmarEliminarProducto(item.title);
    if (resultado.isDenied || resultado.isDismissed) return;

    deleteCartProduct(item.id);
    mostrarToastExito(`Se quitó ${item.title} del carrito`);
  };

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

  const handleCheckout = async () => {
    if (cart.length === 0) {
      mostrarToastError("El carrito está vacío");
      return;
    }

    if (!user || !user.email) {
      mostrarToastError("Debes estar registrado para finalizar la compra");
      return;
    }

    const resultado = await confirmarCompra(user.email);
    if (resultado.isDenied || resultado.isDismissed) return;

    setIsLoading(true);

    try {
      const cartDetails = cart.map((cartProduct) => {
        const dataProduct = products.find(
          (product) => product.id === cartProduct.id
        );
        return {
          productId: cartProduct.id,
          thumbnail: dataProduct.thumbnail,
          title: dataProduct?.title,
          price: dataProduct?.price,
          quantity: cartProduct.quantity,
          subtotal: (dataProduct?.price * cartProduct.quantity).toFixed(2),
        };
      });

      await guardarCarrito(user.email, cartDetails, total.toFixed(2));

      mostrarToastExito("Compra enviada exitosamente.");
      deleteAllCartProducts();
    } catch (error) {
      mostrarToastError("Error al procesar la compra.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingCart) return <Loading loading={isLoadingCart} />;

  return (
    <div className="cartdetail">
      <h2 className="cartdetail-title">Carrito</h2>
      {cart.length === 0 ? (
        <div className="cartdetail-empty">
          <TreePalm size={200} color="#07df48" />
          <p>Tu carrito está vacío</p>
        </div>
      ) : (
        <>
          {cart.map((cartProduct) => {
            const dataProduct = products.find(
              (product) => product.id === cartProduct.id
            );
            return (
              <div key={cartProduct.id} className="cartdetail-container">
                <h3 className="cartdetail-name">{dataProduct?.title}</h3>
                <span className="cartdetail-price">
                  {dataProduct?.price} $ USD
                </span>
                <span className="cartdetail-qty">
                  Cantidad: {cartProduct?.quantity}
                </span>
                <span className="cartdetail-sub">
                  Subtotal:{" "}
                  {(dataProduct?.price * cartProduct?.quantity).toFixed(2)} $USD
                </span>
                <ButtonPrimary
                  onClick={() => handleRemoveItem(dataProduct)}
                  className={"cartdetail-delete"}
                >
                  <Trash2 color="var(--primary-text-color)" />
                </ButtonPrimary>
              </div>
            );
          })}
          <div className="cartdetail-total">
            <strong>Total: {total.toFixed(2)} $ USD</strong>
          </div>
          <div className="cartdetail-checkout">
            <ButtonPrimary onClick={handleCheckout} disabled={isLoading}>
              {isLoading ? "Procesando..." : "Finalizar Compra"}
            </ButtonPrimary>
          </div>
        </>
      )}
    </div>
  );
}
