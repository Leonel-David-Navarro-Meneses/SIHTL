function verifyRole(roles) {
    return (req, res, next) => {
        const userRole = req.user.role;  // `req.user` es el usuario autenticado (del JWT)
        if (!roles.includes(userRole)) {
            return res.status(403).json({ error: "No tienes permisos suficientes" });
        }
        next();
    };
}

module.exports = verifyRole;
