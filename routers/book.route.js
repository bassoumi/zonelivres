const bookController=require('../controllers/book.controler')
const route = require('./auth.route')
const router=require('express').Router()
const GuardAuth=require('./guard.auth')
const multer=require('multer')


// Route pour la recherche de livres par titre
router.get('/search', GuardAuth.isAuth, bookController.searchBooksController);

router.get('/',GuardAuth.isAuth,bookController.getAllBooksController)
router.get('/:id',GuardAuth.isAuth,bookController.getOneBookDetailsController)

route.get('/addbook',GuardAuth.isAuth,bookController.getAddBooksController)
route.post('/addbook', multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'assets/images'); 
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname);  
            }
        })
    }).fields([{ name: 'livre' }, { name: 'cover' }]),
    GuardAuth.isAuth, bookController.PostAddBooksController);


module.exports=router