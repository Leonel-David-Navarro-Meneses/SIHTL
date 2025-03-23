const requestForm = document.getElementById("requestForm");

requestForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const productId = document.getElementById("productId").value;
    const quantity = document.getElementById("quantity").value;
    const reason = document.getElementById("reason").value;
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/api/request", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity, reason })
    });

    const data = await response.json();
    if (response.ok) {
        alert("Solicitud realizada con éxito");
        window.location.href = "./inventory.html";  // Redirige al inventario
    } else {
        alert(data.error || "Error al realizar la solicitud");
    }
});
