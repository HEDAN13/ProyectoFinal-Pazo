import "./ItemCount.css";

export default function ItemCount({ count, remove, add }) {
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
