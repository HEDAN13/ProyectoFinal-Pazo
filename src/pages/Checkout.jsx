import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import CheckoutContainer from "../components/CheckoutContainer/CheckoutContainer";

export default function Checkout() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.accessToken === "") navigate("/login");
  }, []);

  return <CheckoutContainer />;
}
