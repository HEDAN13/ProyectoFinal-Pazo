import "./ItemListContainer.css";
import { useEffect, useState } from "react";
import { getProducts } from "../async.js";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useNavigate, useParams } from "react-router";
import Loading from "../Loading/Loading.jsx";

export default function ItemListContainer() {
  const navigate = useNavigate();
  const { categoria } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

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

  useEffect(() => {
    if (products.length !== 0) {
      setTimeout(() => {
        setIsLoadingProducts(false);
      }, 800);
    }
  }, [products, categoria]);

  if (isLoadingProducts) return <Loading loading={isLoadingProducts} />;

  return (
    <div className="itemList-container">
      {products.map((product) => {
        return <ItemDetail key={product.id} product={product} />;
      })}
    </div>
  );
}
