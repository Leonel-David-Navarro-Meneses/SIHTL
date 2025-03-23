window.onload = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "./index.html";  // Redirigir al login si no está autenticado
    }

    const searchBtn = document.getElementById("searchBtn");
    const inventoryTable = document.getElementById("inventoryTable").getElementsByTagName("tbody")[0];

    // Función para cargar productos
    async function loadProducts(filters = {}) {
        const url = new URL("http://localhost:3000/api/inventory");
        Object.keys(filters).forEach(key => url.searchParams.append(key, filters[key]));

        const response = await fetch(url, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });

        const products = await response.json();
        inventoryTable.innerHTML = "";
        products.forEach(product => {
            const row = inventoryTable.insertRow();
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
            `;
        });
    }

    // Cargar los productos al cargar la página
    loadProducts();

    // Manejo de búsqueda
    searchBtn.addEventListener("click", () => {
        const search = document.getElementById("search").value;
        const minPrice = document.getElementById("minPrice").value;
        const maxPrice = document.getElementById("maxPrice").value;

        loadProducts({
            name: search,
            minPrice: minPrice,
            maxPrice: maxPrice
        });
    });

    // Redirigir a la pantalla de solicitud de producto
    document.getElementById("requestBtn").addEventListener("click", () => {
        window.location.href = "./request.html";
    });
};
