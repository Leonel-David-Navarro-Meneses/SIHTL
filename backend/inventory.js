const express = require("express");
const Product = require("./models/Product");
const verifyRole = require("./verifyRole");  // Middleware para verificar roles

const router = express.Router();

// Ruta para añadir un nuevo producto (solo admin y superadmin)
router.post("/add", verifyRole(["ADMIN", "SUPERADMIN"]), async (req, res) => {
    const { name, description, price, quantity } = req.body;

    // Validación de datos
    if (!name || !description || !price || !quantity) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const newProduct = new Product({ name, description, price, quantity });
    await newProduct.save();

    res.status(201).json({ message: "Producto añadido exitosamente" });
});

// Ruta para obtener productos con filtros
router.get("/", async (req, res) => {
    const { name, minPrice, maxPrice } = req.query;

    let query = {};

    if (name) query.name = { $regex: name, $options: "i" };  // Filtro por nombre (case-insensitive)
    if (minPrice) query.price = { $gte: parseFloat(minPrice) };  // Filtro por precio mínimo
    if (maxPrice) query.price = { ...query.price, $lte: parseFloat(maxPrice) };  // Filtro por precio máximo

    const products = await Product.find(query);
    res.json(products);
});

module.exports = router;
