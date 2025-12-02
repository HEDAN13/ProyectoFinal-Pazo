import "./ProductDetail.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getProductById } from "../../components/async";
import { ShoppingBasket } from "lucide-react";
import ItemCount from "../../components/ItemCount/ItemCount";
import ButtonPrimary from "../../components/ButtonPrimary/ButtonPrimary";
import Loading from "../../components/Loading/Loading";
import useCount from "../../hooks/useCount";
import { CartContext } from "../../context/cartContext";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const { count, add, remove } = useCount({
    initial: 1,
    stock: product?.stock,
  });
  const { addCartProduct } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const producto = await getProductById(productId);
        if (!producto) {
          navigate("/notfound");
          return;
        }
        setProduct(producto);
      } catch (error) {
        navigate("/notfound");
      }
    };
    fetchData();
  }, [productId]);

  useEffect(() => {
    if (product?.title) {
      setTimeout(() => {
        setIsLoadingProduct(false);
      }, 800);
    }
  }, [product]);

  const handleAddCartProduct = () => {
    const newCartProduct = {
      id: product.id,
      quantity: count,
    };
    addCartProduct(newCartProduct);
  };

  if (isLoadingProduct) return <Loading loading={isLoadingProduct} />;

  return (
    <div>
      <div className="slider-imagenes container">
        <div className="row">
          <div
            id="carouselProducts"
            className="carousel carousel-dark slide col-6"
          >
            <div className="carousel-inner">
              {product?.images?.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={image}
                    alt={`${product?.title} ${index}`}
                    className="dblock w-100"
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselProducts"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselProducts"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="col-6 detail">
            <h1 className="detail-title">{product?.title}</h1>
            <p className="detail-description">{product?.description}</p>
            <div className="opciones-compra">
              <ItemCount count={count} add={add} remove={remove} />
              <span>{product?.price} $ USD</span>
            </div>
            <div className="boton-carrito">
              <ButtonPrimary onClick={handleAddCartProduct}>
                <ShoppingBasket />
                Añadir al carrito
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
