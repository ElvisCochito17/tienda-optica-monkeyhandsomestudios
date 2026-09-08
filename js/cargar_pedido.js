document.addEventListener('DOMContentLoaded', () => {
  const rawData = JSON.parse(localStorage.getItem('nombresLentes')) || [];
  
  // Normaliza los productos (asigna precio estimado si se guardó solo como texto)
  const carrito = rawData.map(item => {
    if (typeof item === 'object' && item !== null) {
      return {
        nombre: item.nombre || 'Lente de catálogo',
        precio: item.precio || 29990,
        imagen: item.imagen || 'img/Lentes1.jpg'
      };
    }
    return {
      nombre: item,
      precio: 29990,
      imagen: 'img/Lentes1.jpg'
    };
  });

  // Cálculo de totales
  const subtotal = carrito.reduce((acc, item) => acc + item.precio, 0);
  const costoEnvio = carrito.length > 0 ? 2990 : 0;
  const totalGeneral = subtotal + costoEnvio;

const contenedorPedidos = document.querySelector('.contenedor-pedidos');
if (contenedorPedidos && carrito.length === 0) {
  contenedorPedidos.innerHTML = '<h2>Mis Pedidos</h2><p style="padding: 20px;">No tienes pedidos registrados actualmente.</p>';
}

  // 1. ACTUALIZA MIS PEDIDOS (pedido.html)
  const tarjetaInfo = document.querySelector('.tarjeta-info');
  const tarjetaPrecio = document.querySelector('.tarjeta-precio');
  const tarjetaIcono = document.querySelector('.tarjeta-icono img');

  if (tarjetaInfo && carrito.length > 0) {
    if (tarjetaIcono) tarjetaIcono.src = carrito[0].imagen;
    
    const elemCantidad = tarjetaInfo.querySelector('.cantidad-productos');
    if (elemCantidad) {
      elemCantidad.textContent = `${carrito.length} producto(s)`;
    }
    
    if (tarjetaPrecio) {
      tarjetaPrecio.innerHTML = `<strong>$ ${totalGeneral.toLocaleString('es-CL')}</strong>`;
    }
  }

  // 2. ACTUALIZA DETALLE DE PEDIDO (detalle_pedido.html)
  const contenedorProductos = document.querySelector('.detalle-productos');
  const filaProductosPago = document.querySelectorAll('.fila-pago');

  if (contenedorProductos && carrito.length > 0 && filaProductosPago.length >= 3) {
    let htmlProductos = '<h3>Tu pedido</h3>';
    carrito.forEach(prod => {
      htmlProductos += `
        <div class="item-producto">
            <img src="${prod.imagen}" alt="${prod.nombre}" class="img-item">
            <div class="info-item">
                <h4>${prod.nombre}</h4>
                <p class="precio-descuento">$ ${prod.precio.toLocaleString('es-CL')}</p>
            </div>
            <div class="cantidad-item">1x</div>
        </div>`;
    });
    contenedorProductos.innerHTML = htmlProductos;

    filaProductosPago[0].children[1].textContent = `$ ${subtotal.toLocaleString('es-CL')}`;
    filaProductosPago[1].children[1].textContent = `$ ${costoEnvio.toLocaleString('es-CL')}`;
    filaProductosPago[2].children[1].textContent = `$ ${totalGeneral.toLocaleString('es-CL')}`;
  }

  // 3. ACTUALIZA BOLETA (boleta.html)
  const tablaBoleta = document.querySelector('.boleta-tabla tbody');
  const contenedorTotales = document.querySelector('.boleta-totales');

  if (tablaBoleta && carrito.length > 0) {
    tablaBoleta.innerHTML = '';
    carrito.forEach(prod => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>1</td>
        <td>${prod.nombre}</td>
        <td>$ ${prod.precio.toLocaleString('es-CL')}</td>
      `;
      tablaBoleta.appendChild(fila);
    });

    if (costoEnvio > 0) {
      const filaEnvio = document.createElement('tr');
      filaEnvio.innerHTML = `<td>1</td><td>Costo de Envío</td><td>$ ${costoEnvio.toLocaleString('es-CL')}</td>`;
      tablaBoleta.appendChild(filaEnvio);
    }

    if (contenedorTotales) {
      contenedorTotales.innerHTML = `<p><strong>TOTAL: $ ${totalGeneral.toLocaleString('es-CL')}</strong></p>`;
    }
  }
});