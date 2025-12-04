import { useEffect, useState } from "react";
import { getCartsByEmail } from "../async";
import { mostrarToastError } from "../notificaciones";
import Loading from "../Loading/Loading";
import CheckoutDetail from "../CheckoutDetail/CheckoutDetail";
import { Wind } from "lucide-react";
import "./CheckoutContainer.css";

export default function CheckoutContainer() {
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCarts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const email = user?.email;

        if (!email) {
          setCarts([]);
          return;
        }

        const results = await getCartsByEmail(email);
        setCarts(results);
      } catch (error) {
        mostrarToastError(error);
        setCarts([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadCarts();
  }, []);

  if (isLoading) return <Loading loading={isLoading} />;

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Historial de compras</h2>
      {carts.length === 0 ? (
        <div className="cartdetail-empty">
          <Wind size={200} color="grey" />
          <p>Aún no has realizado ninguna compra</p>
        </div>
      ) : (
        <div className="accordion" id="accordionCarts">
          {carts.map((cart) => (
            <CheckoutDetail key={cart.id} cart={cart} />
          ))}
        </div>
      )}
    </div>
  );
}
