export function confirmarAgregarProducto(nombreProducto) {
  return Swal.fire({
    title: "¿Agregar al carrito?",
    text: `"¿Deseas agregar "${nombreProducto}" al carrito?`,
    icon: "question",
    showDenyButton: true,
    denyButtonText: "Cancelar",
    confirmButtonColor: "var(--primary-color)",
    denyButtonColor: "hsl(from var(--primary-color) h 10% l)",
    background: "hsl(from var(--primary-color) h s calc(l + 18))",
    color: "hsl(from var(--primary-text-color) h s l /0.8)",
  });
}

export function confirmarEliminarProducto(nombreProducto) {
  return Swal.fire({
    title: "¿Quitar del carrito?",
    text: `"¿Deseas remover "${nombreProducto}" del carrito?`,
    icon: "question",
    showDenyButton: true,
    denyButtonText: "Cancelar",
    confirmButtonColor: "var(--primary-color)",
    denyButtonColor: "hsl(from var(--primary-color) h 10% l)",
    background: "hsl(from var(--primary-color) h s calc(l + 18))",
    color: "hsl(from var(--primary-text-color) h s l /0.8)",
  });
}

export function confirmarCompra(email) {
  return Swal.fire({
    title: "¿Finalizar compra?",
    text: `${email.split("@")[0]}: Has clic para confirmar tu compra.`,
    icon: "question",
    showDenyButton: true,
    denyButtonText: "Cancelar",
    confirmButtonColor: "var(--primary-color)",
    denyButtonColor: "hsl(from var(--primary-color) h 10% l)",
    background: "hsl(from var(--primary-color) h s calc(l + 18))",
    color: "hsl(from var(--primary-text-color) h s l /0.8)",
  });
}

export function mostrarToastExito(mensaje) {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: mensaje,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "hsl(from var(--primary-color) h s calc(l + 18))",
    color: "hsl(from var(--primary-text-color) h s l /0.8)",
  });
}

export function mostrarToastError(mensaje) {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "error",
    title: mensaje,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "hsl(from var(--primary-color) h s calc(l + 18))",
    color: "hsl(from var(--primary-text-color) h s l /0.8)",
  });
}
