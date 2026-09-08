// Función para cambiar entre las tablas del panel de administrador
function cambiarVista(idVista, botonClickeado) {
    // 1. Ocultamos todas las vistas (tablas)
    let vistas = document.querySelectorAll('.admin-vista');
    vistas.forEach(vista => vista.style.display = 'none');

    // 2. Mostramos solo la vista que queremos
    document.getElementById(idVista).style.display = 'block';

    // 3. Le quitamos el color activo a todos los botones
    let botones = document.querySelectorAll('.admin-nav a');
    botones.forEach(boton => boton.classList.remove('activo'));

    // 4. Le ponemos el color activo solo al botón que acabamos de clickear
    botonClickeado.classList.add('activo');
}