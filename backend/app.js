const express = require('express');
require('dotenv').config();
const requisitionsRoutes = require('./routes/requisitionsRoutes');
const materialsRoutes = require('./routes/materialsRoutes');
const suppliersRoutes = require('./routes/suppliersRoutes');

const app = express();
app.use(express.json());

// Rutas
app.use('/api/requisitions', requisitionsRoutes);
app.use('/api/materials', materialsRoutes);
app.use('/api/suppliers', suppliersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
