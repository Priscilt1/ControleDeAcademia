// para saber qual pagina esta
const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")


// logica para aplicar a classe active na pagina que estiver clicada
for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    } 
}