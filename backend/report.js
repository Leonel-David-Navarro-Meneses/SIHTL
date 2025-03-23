const express = require("express");
const fs = require("fs");
const PDFDocument = require("pdfkit");

const router = express.Router();

// Ruta para generar el reporte PDF de la solicitud
router.get("/generate-report/:requestId", async (req, res) => {
    const requestId = req.params.requestId;

    // Aquí puedes obtener la solicitud desde la base de datos, por ejemplo:
    // const request = await Request.findById(requestId).populate("productId");

    // Para este ejemplo, vamos a crear un reporte estático:
    const doc = new PDFDocument();
    const filename = `reporte_solicitud_${requestId}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    doc.pipe(res);

    doc.fontSize(18).text(`Reporte de Solicitud de Producto`, 100, 80);
    doc.fontSize(12).text(`ID Solicitud: ${requestId}`, 100, 120);
    doc.text(`Producto: Ejemplo Producto`, 100, 150);
    doc.text(`Cantidad solicitada: 5`, 100, 180);
    doc.text(`Razón: Reemplazo de stock agotado`, 100, 210);
    doc.text(`Estado: Pendiente`, 100, 240);

    doc.end();
});

module.exports = router;
