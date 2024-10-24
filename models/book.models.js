const mongoose = require('mongoose');

// Connexion à la base de données MongoDB
let url = 'mongodb://localhost:27017/library';

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    userId: String,
    livre: String,
    cover: String,
    downloads: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

// Vérifier si le modèle existe déjà avant de le définir
const Book = mongoose.model('Book', bookSchema);
bookSchema.statics.searchByTitle = (title) => {
    return new Promise((resolve, reject) => {
        Book.find({ title: { $regex: title, $options: 'i' } }) // Recherche insensible à la casse
            .then(books => resolve(books))
            .catch(err => reject(err));
    });
};

// Connexion à MongoDB
mongoose.connect(url)
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(err => console.error("Erreur de connexion à MongoDB :", err.message));

// Exporter le modèle et les fonctions
module.exports = {
    Book,

    getThreeBooks: () => {
        return new Promise((resolve, reject) => {
            Book.find({}).limit(3)
                .then(books => resolve(books))
                .catch(err => reject(err));
        });
    },

    getOneBookDetails: (id) => {
        return new Promise((resolve, reject) => {
            Book.findById(id)
                .then(book => resolve(book))
                .catch(err => reject(err));
        });
    },

    getAllBooks: () => {
        return new Promise((resolve, reject) => {
            Book.find({})
                .then(books => resolve(books))
                .catch(err => reject(err));
        });
    },

    postDataBookModel: (userId, title, description, author, livre, cover) => {
        return new Promise((resolve, reject) => {
            let book = new Book({
                title,
                description,
                author,
                cover, // Chemin de la couverture
                livre, // Chemin du PDF
                userId,
                createdAt: Date.now() // Ajout de la date d'ajout
            });
            book.save()
                .then(() => resolve('Livre ajouté avec succès !'))
                .catch(err => reject(err));
        });
    },
    
    getMyBooks: (userId) => {
        return new Promise((resolve, reject) => {
            Book.find({ userId })
                .then(books => resolve(books))
                .catch(err => reject(err));
        });
    },

    deleteBook: (id) => {
        return new Promise((resolve, reject) => {
            Book.deleteOne({ _id: id })
                .then(() => resolve('Livre supprimé avec succès !'))
                .catch(err => reject(err));
        });
    },

    getPageUpdateBookModel: (id) => {
        return new Promise((resolve, reject) => {
            Book.findById(id)
                .then(book => resolve(book))
                .catch(err => reject(err));
        });
    },

    postUpdateBookModel: (bookId, title, description, author, price, filename, userId) => {
        return new Promise((resolve, reject) => {
            Book.updateOne({ _id: bookId }, { title, description, author, livre: filename, price, userId })
                .then(() => resolve('Updated!'))
                .catch(err => reject(err));
        });
    },
    searchByTitle: (title) => {
        return new Promise((resolve, reject) => {
            Book.find({ title: { $regex: title, $options: 'i' } }) // Recherche insensible à la casse
                .then(books => resolve(books))
                .catch(err => reject(err));
        });
    }

    
};
