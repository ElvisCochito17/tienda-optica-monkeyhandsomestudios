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
  listaLentes.forEach(item => {
    // Detecta si es un objeto o un texto simple para no romper mensajes antiguos
    const nombre = typeof item === 'object' ? item.nombre : item;
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

    // Guarda el objeto completo con precio e imagen para boletas y pedidos
    const producto = {
      nombre: tarjeta.querySelector('h4').textContent.trim(),
      precio: parseInt(boton.getAttribute('data-precio')) || 0,
      imagen: tarjeta.querySelector('img').getAttribute('src')
    };

    listaLentes.push(producto);
    localStorage.setItem('nombresLentes', JSON.stringify(listaLentes));
    actualizarContador();
    alert(`¡${producto.nombre} añadido al carrito!`);
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