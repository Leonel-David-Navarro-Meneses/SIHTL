const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    reason: { type: String, required: true },
    status: { type: String, required: true, enum: ["Pendiente", "Aprobada", "Rechazada"], default: "Pendiente" }
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
