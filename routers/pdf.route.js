// pdfRoutes.js
const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/pdf.controler");
const upload = require("../models/upload");

// Route pour télécharger et convertir un PDF
router.post("/uploadBook", upload.single("book"), pdfController.uploadAndConvert);

module.exports = router;
