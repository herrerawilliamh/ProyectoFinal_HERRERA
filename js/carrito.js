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
    productosEnCarrito.length = 0;
    cargarProductosCarrito();
    localStorage.setItem("productosEnCarritoCompra", JSON.stringify(productosEnCarrito));
}

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$ ${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productosEnCarritoCompra", JSON.stringify(productosEnCarrito));
    contenedorCarritoVacio.classList.add("disable");
    contenedorCarritoProductos.classList.add("disable");
    contenedorCarritoAcciones.classList.add("disable");
    contenedorCarritoPagado.classList.remove("disable");
}