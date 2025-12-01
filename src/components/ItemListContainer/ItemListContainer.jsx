import "./ItemListContainer.css";
import { useEffect, useState } from "react";
import { getProducts } from "../async.js";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useNavigate, useParams } from "react-router";

export default function ItemListContainer() {
  const navigate = useNavigate();
  const { categoria } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productos = await getProducts();
      if (!categoria) {
        setProducts(productos);
      } else {
        const productsByCategory = productos.filter(
          (prod) => prod.category === categoria
        );

        if (productsByCategory.length == 0) {
          navigate("/notfound");
          return;
        }
        setProducts(productsByCategory);
      }
    };
    fetchData();
  }, [categoria]);

  return (
    <div className="itemList-container">
      {products.map((product) => {
        return <ItemDetail key={product.id} product={product} />;
      })}
    </div>
  );
}
