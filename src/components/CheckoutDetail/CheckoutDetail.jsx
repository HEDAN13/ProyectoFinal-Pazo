import "./CheckoutDetail.css";

export default function CheckoutDetail({ cart }) {
  const id = cart.id;
  const headerId = `heading-${id}`;
  const collapseId = `collapse-${id}`;

  const fecha = cart.createdAt ? new Date(cart.createdAt).toLocaleString() : "";
  const totalPrice = Number(cart.total || 0).toFixed(2);
  const totalUnits =
    cart.totalUnits ??
    (cart.items || []).reduce((a, b) => a + (Number(b.quantity) || 0), 0);

  return (
    <div className="accordion-item mb-2">
      <h2 className="accordion-header" id={headerId}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapseId}`}
          aria-expanded="false"
          aria-controls={collapseId}
        >
          <div className="accordion-titles">
            <div>
              <strong>{fecha}</strong>
            </div>
            <div className="text-end">
              <div>{totalUnits} unidades</div>
              <div>Total: ${totalPrice}</div>
            </div>
          </div>
        </button>
      </h2>

      <div
        id={collapseId}
        className="accordion-collapse collapse"
        aria-labelledby={headerId}
        data-bs-parent="#accordionCarts"
      >
        <div className="accordion-body">
          <div className="list-group">
            {(cart.items || []).map((item, idx) => (
              <div
                key={idx}
                className="list-group-item d-flex align-items-center gap-3"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />
                <div className="flex-grow-1">
                  <div className="fw-bold">{item.title}</div>
                  <div>Cantidad: {item.quantity}</div>
                </div>
                <div className="text-end">
                  <div>Precio: ${Number(item.price || 0).toFixed(2)}</div>
                  <div>
                    Subtotal: $
                    {(
                      Number(item.price || 0) * Number(item.quantity || 0)
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
