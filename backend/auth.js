const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const router = express.Router();

// Ruta para registrar un nuevo usuario (solo para admins o superadmins)
router.post("/register", async (req, res) => {
    const { username, password, role } = req.body;
    
    // Validación de rol
    if (role !== "USUARIO" && role !== "ADMIN" && role !== "SUPERADMIN") {
        return res.status(400).json({ error: "Rol inválido" });
    }

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ username });
    if (userExists) {
        return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "Usuario creado exitosamente" });
});

// Ruta para login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Buscar el usuario en la base de datos
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ error: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // Crear un token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, "secreto", { expiresIn: "1h" });

    res.json({ token, role: user.role });
});

module.exports = router;
