function validacionFormulario(event) {
  if (event) event.preventDefault();

  let correo = document.getElementById("txtEmail").value.trim();
  let asunto = document.getElementById("txtAsunto").value.trim();
  let mensaje = document.getElementById("txtMensaje").value.trim();
  let sexo = document.getElementById("cboSexo").value;
  let edad = parseInt(document.getElementById("txtEdad").value, 10);

  if (asunto.length < 3) {
    alert("El asunto debe tener un mínimo de 3 caracteres.");
    return false;
  }

  if (isNaN(edad) || edad < 18) {
    alert("Solo mayores de edad.");
    return false;
  }

  // Lee la variable del carrito sin alterarla
  if (!listaLentes || listaLentes.length === 0) {
    alert("Tu carrito está vacío. Agrega productos desde el catálogo.");
    return false;
  }

  alert("¡Cotización enviada con éxito! Redirigiendo a pedidos...");
  window.location.href = "pedido.html";
  return false;
}