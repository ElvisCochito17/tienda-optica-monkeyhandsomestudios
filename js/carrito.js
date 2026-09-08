// Carga la lista persistente o inicializa el arreglo
let listaLentes = JSON.parse(localStorage.getItem('nombresLentes')) || [];
const contador = document.getElementById('contador-carrito');
const mensaje = document.getElementById('txtMensaje');
const btnRestar = document.getElementById('btnRestar');

function actualizarContador() {
  if (contador) {
    contador.textContent = listaLentes.length;
  }
}
actualizarContador();

// Agrupa productos repetidos para la cotización (ej: 2x Lentes de sol)
function formatearMensaje() {
  if (listaLentes.length === 0) return '';

  const conteo = {};
  listaLentes.forEach(nombre => {
    conteo[nombre] = (conteo[nombre] || 0) + 1;
  });

  const lineas = Object.keys(conteo).map(nombre => `- ${conteo[nombre]}x ${nombre}`);
  return "Hola, me gustaría cotizar los siguientes lentes:\n" + lineas.join("\n");
}

// Rellena el textarea si el usuario llega a contacto con items guardados
if (mensaje && listaLentes.length > 0) {
  mensaje.value = formatearMensaje();
}

// Evento para añadir lentes desde las cards del catálogo
document.querySelectorAll('.btn-agregar').forEach(boton => {
  boton.addEventListener('click', () => {
    const tarjeta = boton.closest('.tarjeta-lentes');
    const nombreLente = tarjeta.querySelector('h4').textContent.trim();

    listaLentes.push(nombreLente);
    localStorage.setItem('nombresLentes', JSON.stringify(listaLentes));
    actualizarContador();
  });
});

// Descuenta el último item agregado y actualiza la vista
if (btnRestar) {
  btnRestar.addEventListener('click', () => {
    if (listaLentes.length > 0) {
      listaLentes.pop();
      localStorage.setItem('nombresLentes', JSON.stringify(listaLentes));
      actualizarContador();

      if (mensaje) {
        mensaje.value = formatearMensaje();
      }
    } else {
      alert("No hay productos en el carrito.");
    }
  });
}

// Limpia el storage al enviar el formulario
function validacionFormulario() {
  alert('Cotización enviada correctamente.');
  localStorage.removeItem('nombresLentes');
  return true;
}