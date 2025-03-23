const express = require("express");
const Request = require("./models/Request");
const verifyRole = require("./verifyRole");

const router = express.Router();

// Ruta para crear una solicitud de producto (cualquier usuario)
router.post("/", verifyRole(["USUARIO", "ADMIN", "SUPERADMIN"]), async (req, res) => {
    const { productId, quantity, reason } = req.body;

    if (!productId || !quantity || !reason) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const newRequest = new Request({ productId, quantity, reason, status: "Pendiente" });
    await newRequest.save();

    res.status(201).json({ message: "Solicitud de producto creada exitosamente" });
});

// Ruta para obtener las solicitudes (solo admin y superadmin)
router.get("/", verifyRole(["ADMIN", "SUPERADMIN"]), async (req, res) => {
    const requests = await Request.find();
    res.json(requests);
});

module.exports = router;
