const BookModel = require('../models/book.models');
const mongoose = require('mongoose');
const path = require('path');
const { fromPath } = require('pdf2pic'); // Pour convertir le PDF en image

// Contrôleur pour obtenir tous les livres
exports.getAllBooksController = (req, res, next) => {
    BookModel.getAllBooks()
        .then(books => {
            res.render('books', { books: books, verifuser : req.session.userId }); // Afficher les livres
        })
        .catch(err => {
            console.error("Erreur lors de la récupération des livres:", err);
            res.status(500).send("Erreur serveur lors de la récupération des livres");
        });
};

exports.getOneBookDetailsController=(req,res,next)=>{
    let id=req.params.id
    BookModel.getOneBookDetails(id).then(resbook=>{
        res.render('details',
        {book:resbook,verifuser:req.session.userId}
        )
    })


}

// Contrôleur pour afficher le formulaire d'ajout de livre
exports.getAddBooksController = (req, res, next) => {
    res.render('addbook', { verifuser: req.session.userId, Smessage: req.flash('sucseccMessage')[0], Emessage: req.flash('ErrosMessage')[0] });
};

exports.PostAddBooksController = (req, res) => {
    const coverPath = `images/${req.files['cover'][0].filename}`; // Chemin de la couverture
    const livrePath = `images/${req.files['livre'][0].filename}`; // Chemin du livre

    BookModel.postDataBookModel(
        req.session.userId,
        req.body.title,
        req.body.description,
        req.body.author,
        livrePath, // Chemin du livre
        coverPath  // Chemin de la couverture
    )
    .then((msg) => {
        req.flash('Successmessage', msg);
        res.redirect('books');
    })
    .catch((err) => {
        console.error("Erreur lors de l'ajout du livre :", err);
        req.flash('Errormessage', err.message);
        res.redirect('addbook');
    });
};


exports.searchBooksController = (req, res, next) => {
    const title = req.query.title; // Suppose que le titre est passé en tant que paramètre de requête
    BookModel.searchByTitle(title)
        .then(books => {
            res.render('books', { books: books, verifuser: req.session.userId }); // Renderisez votre page de résultats
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la recherche des livres' });
        });
    };