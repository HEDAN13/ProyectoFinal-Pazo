import { useEffect, useState } from "react";
import "./CategoryListMenu.css";
import { getCategories } from "../async";
import { useNavigate, useParams } from "react-router";
import { useLocation } from "react-router";

export default function CategoryListMenu() {
  const navigate = useNavigate();
  const { categoria } = useParams();
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoria);
  const location = useLocation();

  useEffect(() => {
    const fetchCat = async () => {
      const categories = await getCategories();
      setCategorias(categories);
    };
    fetchCat();
  }, []);

  useEffect(() => {
    if (location.pathname === "/") setCategoriaSeleccionada("Categorias");
  }, [location]);

  useEffect(() => {
    if (categoriaSeleccionada && categoriaSeleccionada !== "Categorias") {
      navigate(`/category/${categoriaSeleccionada}`);
    } else {
      setCategoriaSeleccionada("Categorias");
    }
  }, [categoriaSeleccionada]);

  const handleChange = (event) => {
    setCategoriaSeleccionada(event.target.value);
  };

  return (
    <div className="select-wrapper">
      <select
        name="categorias"
        id="categorias"
        className="categoria-select"
        value={categoriaSeleccionada}
        onChange={handleChange}
      >
        <option value="">Categorias</option>
        {categorias.map((categoria, index) => {
          return (
            <option key={index} value={categoria}>
              {categoria}
            </option>
          );
        })}
      </select>
    </div>
  );
}
