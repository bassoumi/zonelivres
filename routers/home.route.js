const express = require('express');
const homecontroller = require('../controllers/home.controler');
const multer=require('multer')


const router = express.Router();
const GuardAuth = require('./guard.auth');
const bookscontroller = require('../controllers/book.controler');

// Assurez-vous que `gethreeBooks.gethreeBooks` est une fonction valide
router.get('/', homecontroller.threeBooksController);


// Exportez correctement le routeur
module.exports = router;

/* router.post('/addbook', multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'assets/images');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    })
}).single('image'),GuardAuth.isAuth,bookscontroller.PostAddBooksController); */