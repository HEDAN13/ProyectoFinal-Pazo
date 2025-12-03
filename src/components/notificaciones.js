export function confirmarAgregarProducto(nombreProducto) {
  return Swal.fire({
    title: "¿Agregar al carrito?",
    text: `"¿Deseas agregar "${nombreProducto}" al carrito?`,
    icon: "question",
    showDenyButton: true,
    denyButtonText: "Cancelar",
    confirmButtonColor: "var(--primary-color)",
    denyButtonColor: "hsl(from var(--primary-color) h 10% l)",
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
  });
}
