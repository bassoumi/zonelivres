const multer = require("multer");
const path = require("path");

// Configuration du stockage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Dossier où stocker les fichiers téléchargés
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Renommer le fichier
    }
});

// Initialiser multer avec la configuration de stockage
const upload = multer({ storage: storage });

// Exporter l'instance configurée de multer
module.exports = upload;
