// pdfController.js
const { fromPath } = require("pdf2pic");
const path = require("path");

const convertPDFToImage = async (filePath, outputFilename) => {
    const options = {
        density: 100,
        saveFilename: outputFilename,
        savePath: "./uploads",
        format: "png",
        width: 600,
        height: 800,
    };

    const storeAsImage = fromPath(filePath, options);

    try {
        const page = await storeAsImage(1); // Convertir uniquement la première page
        console.log("Image path:", page.path);
        return page.path; // Retourner le chemin de l'image générée
    } catch (error) {
        console.error("Erreur lors de la conversion du PDF:", error);
        return null;
    }
};

exports.uploadAndConvert = async (req, res) => {
    if (req.file) {
        const pdfPath = req.file.path; // Chemin du fichier PDF
        console.log("PDF Path:", pdfPath); // Ajoutez cette ligne pour vérifier le chemin
        
        // Pas besoin de convertir en image pour le téléchargement.
        res.status(200).json({
            message: "Livre téléchargé avec succès",
            file: pdfPath, // Retourner le chemin du fichier pour le téléchargement si nécessaire
        });
    } else {
        res.status(400).json({ message: "Aucun fichier téléchargé" });
    }
};
