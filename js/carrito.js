const productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarritoCompra"));
const contenedorCarritoVacio = document.querySelector("#cart_empty");
const contenedorCarritoProductos = document.querySelector("#products_cart");
const contenedorCarritoAcciones = document.querySelector("#cart_actions");
const contenedorCarritoPagado = document.querySelector("#cart_payed");
let botonesEliminarProducto = document.querySelectorAll(".product_cart_delete");
const botonVaciar = document.querySelector("#cart_actions_left_empty");
const botonComprar = document.querySelector("#cart_action_right_button_submit");
const contenedorTotal = document.querySelector("#total");

function cargarProductosCarrito(){
    if(productosEnCarrito && productosEnCarrito.length >0){
        contenedorCarritoVacio.classList.add("disable");
        contenedorCarritoProductos.classList.remove("disable");
        contenedorCarritoAcciones.classList.remove("disable");
        contenedorCarritoPagado.classList.add("disable");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("product_cart");
            div.innerHTML = `
                <img class="product_cart_image" src="${producto.imagen}" alt="${producto.producto}">
                <div class="product_name">
                    <small>Nombre del producto</small>
                    <h3>${producto.producto}</h3>
                </div>
                <div class="product_amount">
                    <small>Cantidad</small>
                    <h3>${producto.cantidad}</h3>
                </div>
                <div class="product_price">
                    <small>Precio</small>
                    <h3>$ ${producto.precio}</h3>
                </div>
                <div class="product_subtotal">
                    <small>Subtotal</small>
                    <h3>$ ${producto.precio * producto.cantidad}</h3>
                </div>
                <div class="product_delete">
                    <button class="product_cart_delete" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
                </div>
            `;
            contenedorCarritoProductos.append(div);
        })    
    }else{
        contenedorCarritoVacio.classList.remove("disable");
        contenedorCarritoProductos.classList.add("disable");
        contenedorCarritoAcciones.classList.add("disable");
        contenedorCarritoPagado.classList.add("disable");
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".product_cart_delete");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarPRoductoCarrito);
    });
}

function eliminarPRoductoCarrito(e){
    Toastify({
        text: "👎🏻 Producto eliminado 📦",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #2D7331, #58af5c)",
          borderRadius: "1.5rem",
          textTransform: "uppercase",
          fontSize: ".85rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    console.log(productosEnCarrito)
    productosEnCarrito.splice(index, 1);
    console.log(productosEnCarrito)
    cargarProductosCarrito();
    localStorage.setItem("productosEnCarritoCompra", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Estás seguro?',
        text: `¡Si haces esto perderás los ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos de tu carrito!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, borralos!',
        cancelButtonText: 'No, ¡sálvame!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) { 
          swalWithBootstrapButtons.fire(
            '¡Carrito vacío!',
            'Los productos en el carrito se han borrado.',
            'success'
          )
            productosEnCarrito.length = 0;
            cargarProductosCarrito();
            localStorage.setItem("productosEnCarritoCompra", JSON.stringify(productosEnCarrito));
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            '¡Nada ha pasado!',
            'Todos tus productos siguen en el carrito.',
            'success'
          )
        }
      })    
}

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$ ${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productosEnCarritoCompra", JSON.stringify(productosEnCarrito));
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Quieres realizar la compra?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          '¡Felicidades!',
          'Tu compra ha sido realizada.',
          'success'
        )
        contenedorCarritoVacio.classList.remove("disable");
        contenedorCarritoProductos.classList.add("disable");
        contenedorCarritoAcciones.classList.add("disable");
        contenedorCarritoPagado.classList.add("disable");
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Compra cancelada',
          'Sigue comprando :)',
          'error'
        )
      }
    })
}