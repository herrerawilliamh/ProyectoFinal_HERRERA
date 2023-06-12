const openMenu = document.querySelector("#open_menu_buttom");
const closeMenu = document.querySelector("#close_menu_buttom");
const aside = document.querySelector("aside");

openMenu.addEventListener("click", ()=>{
    aside.classList.add("aside_visible");
})

closeMenu.addEventListener("click", ()=>{
    aside.classList.remove("aside_visible");
})

categoriaBotones.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside_visible");
}))