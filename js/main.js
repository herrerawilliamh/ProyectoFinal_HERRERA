//Creación de productos
const productos=[  
    {id:"zapato-01", producto: "Botas", categoria:{nombre:"Calzado", id:"calzado"}, precio: 320000, imagen: "https://cache.tradeinn.com/images/fotos_subfamilias/3096.jpg"},
    {id:"zapato-02", producto: "Pantuflas", categoria:{nombre: "Calzado", id: "calzado"}, precio: 180000, imagen: "https://cache.tradeinn.com/images/fotos_subfamilias/15009.jpg"},
    {id:"zapato-03", producto: "Escaladoras", categoria:{nombre: "Calzado", id: "calzado"}, precio: 250000, imagen: "https://cache.tradeinn.com/images/fotos_subfamilias/14264.jpg"},
    {id:"zapato-04", producto: "Sandalias", categoria:{nombre: "Calzado", id: "calzado"}, precio: 120000, imagen: "https://cache.tradeinn.com/images/fotos_subfamilias/3144.jpg"},
    {id:"zapato-05", producto: "Tenis", categoria:{nombre: "Calzado", id: "calzado"}, precio: 280000, imagen: "https://cache.tradeinn.com/images/fotos_subfamilias/3097.jpg"},
    {id:"zapato-06", producto: "Running", categoria:{nombre: "Calzado", id: "calzado"}, precio: 350000, imagen: "https://cache.tradeinn.com/images/fotos_subfamilias/16816.jpg"},
    {id:"ropa-01", producto: "Camisa", categoria:{nombre: "Ropa", id: "ropa"}, precio: 120000, imagen: "https://cache.tradeinn.com/images/fotos_subfamilias/3148.jpg"},
    {id:"ropa-02", producto: "Pantalon", categoria:{nombre: "Ropa", id: "ropa"}, precio: 180000, imagen: "https://cache.tradeinn.com/images/fotos_subfamilias/11450.jpg"},
    {id:"ropa-03", producto: "Chaqueta", categoria:{nombre: "Ropa", id: "ropa"}, precio: 250000, imagen: "https://cache.tradeinn.com/images/fotos_subfamilias/11507.jpg"},
    {id:"ropa-04", producto: "Calcetines", categoria:{nombre: "Ropa", id: "ropa"}, precio: 50000, imagen: "https://cache.tradeinn.com/images/fotos_subfamilias/3023.jpg"},
    {id:"accesorio-01", producto: "Gorra", categoria:{nombre: "Accesorios", id: "accesorio"}, precio: 30000, imagen: "https://cache.tradeinn.com/images/fotos_subfamilias/18639.jpg"},
    {id:"accesorio-02", producto: "Bandas", categoria:{nombre: "Accesorios", id: "accesorio"}, precio: 150000, imagen: "https://cache.tradeinn.com/images/fotos_subfamilias/18638.jpg"},
    {id:"accesorio-03", producto: "Gorro", categoria:{nombre: "Accesorios", id: "accesorio"}, precio: 70000, imagen: "https://cache.tradeinn.com/images/fotos_subfamilias/3021.jpg"},
    {id:"accesorio-04", producto: "Guantes", categoria:{nombre: "Accesorios", id: "accesorio"}, precio: 40000, imagen: "https://cache.tradeinn.com/images/fotos_subfamilias/3020.jpg"},
];

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