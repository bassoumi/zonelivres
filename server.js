const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const multer = require('multer');  // Pour gérer les uploads
const { fromPath } = require("pdf2pic"); // Pour convertir le PDF en image
const fs = require('fs');  // Gestion des fichiers

const routerHome = require('./routers/home.route');
const routerBook = require('./routers/book.route');
const routerAuth = require('./routers/auth.route');
const routeContact = require('./routers/contact.route');
const routeAbout = require('./routers/about.route');
const pdfRoutes = require("./routers/pdf.route");
const routemybooks = require('./routers/mybooks.route');

const app = express();



app.use(express.static(path.join(__dirname, 'assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploads

app.set('view engine', 'ejs');
app.set('views', 'views');

var Store = new MongoDbStore({
    uri: 'mongodb://localhost:27017/library',
    collection: 'sessions'
});

app.use(flash());
app.use(session({
    secret: '10204566kebu21e53he5nfy31',
    store: Store,
    resave: true,
    saveUninitialized: true
}));

app.use('/', routerHome);
app.use('/books', routerBook);
app.use('/', routerAuth);
app.use('/contact', routeContact);
app.use('/about', routeAbout);
app.use('/mybooks', routemybooks);

// Route pour le tableau de bord
app.get('/dashboard', (req, res, next) => {
    res.render('dashboard', { verifuser: req.session.userId });
});

// Route pour les tables
app.get('/tables', (req, res, next) => {
    res.render('tables');
});



app.get('/images/:filename', async (req, res) => {
    const filePath = path.join(__dirname, 'assets/images', req.params.filename);
    console.log("Filename received:", req.params.filename);  // Log du nom du fichier reçu

    try {
        // Log avant la recherche dans la base de données
        console.log("Searching for book in database...");
        const book = await Book.findOne({ livre: `images/${req.params.filename}` });
        console.log("Book found:", book);  // Log du livre trouvé

        if (!book) {
            console.log("Livre non trouvé dans la base de données.");
            return res.status(404).send("Livre non trouvé");
        }

        // Incrémenter le compteur
        book.downloads += 1;
        const updatedBook = await book.save();
        console.log("Downloads updated:", updatedBook.downloads); // Affiche le nombre de téléchargements après la sauvegarde

        // Envoie le fichier
        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.error("File not found:", err);
                return res.status(404).send("File not found");
            }

            res.download(filePath, (err) => {
                if (err) {
                    console.error("Error sending file:", err);
                    return res.status(500).send("Could not download file");
                }
            });
        });
    } catch (err) {
        console.error("Erreur serveur :", err);
        res.status(500).send("Erreur serveur");
    }
});




// Démarrer le serveur
app.listen(3000,()=>console.log('server run in port 3000'))





/* const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  
    }
}); */

/* const upload = multer({ storage: storage }); */