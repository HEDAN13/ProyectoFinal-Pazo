import useCount from "../../hooks/useCount";
import "./ItemCount.css";

export default function ItemCount({ stock }) {
  const { count, remove, add } = useCount({ initial: 1, stock });

  return (
    <div className="itemCount">
      <button onClick={remove} className="itemCount-button">
        -
      </button>
      <span className="itemCount-value">{count}</span>
      <button onClick={add} className="itemCount-button">
        +
      </button>
    </div>
  );
}
