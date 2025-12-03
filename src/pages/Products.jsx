import { useContext, useEffect } from "react";
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";

export default function Products() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.accessToken === "") navigate("/login");
  }, []);

  return <ItemListContainer />;
}
