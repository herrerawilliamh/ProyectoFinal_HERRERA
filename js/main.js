let productos = [];
fetch("./js/productos.json")
.then(response => response.json())
.then(data => {
    productos = data;
    cargarProductos(productos);
})

const contenedorProductos = document.querySelector("#products_container");
const categoriaBotones = document.querySelectorAll(".categorie_buttom");
const tituloPrincipal = document.querySelector("#main_title");
let botonesAgregar = document.querySelectorAll(".product_submit");
const number = document.querySelector("#number");

function cargarProductos(productosElegidos){
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <img class="product_image" src="${producto.imagen}" alt="${producto.producto}">
            <div class="product_details">
                <h3 class="product_title">${producto.producto}</h3>
                <p class="product_price">COP $_${producto.precio}</p>
                <button class="product_submit" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}

cargarProductos(productos);

//Filtrar productos por categoría
categoriaBotones.forEach(buttom => {
    buttom.addEventListener("click", (e) => {
        categoriaBotones.forEach(buttom => buttom.classList.remove("active"));
        e.currentTarget.classList.add("active");
        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }else{
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    });
})

//Agregar productos al carrito
function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".product_submit");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;
let nuevoNumero;
const productosEnCarritoLS =JSON.parse(localStorage.getItem("productosEnCarritoCompra"));
if(productosEnCarritoLS){
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumero();
}else{
    productosEnCarrito = [];
}

function agregarAlCarrito(e){
    Toastify({
        text: "👌 Producto agregado 📦",
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
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado); 
    }
    actualizarNumero();
    localStorage.setItem("productosEnCarritoCompra", JSON.stringify(productosEnCarrito));
}

function actualizarNumero(){
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    number.innerText = nuevoNumero;
}