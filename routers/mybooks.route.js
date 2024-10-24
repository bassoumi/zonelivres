

const express = require('express');
const mybookscontroler = require('../controllers/mybooks.controler');
const router = express.Router();
const multer=require('multer')

const guardAuth=require('./guard.auth')



router.get('/',mybookscontroler.getmybooksPage);
router.get('/delete/:id',mybookscontroler.deletebookcontroler);
router.get('/update/:id',mybookscontroler.getmybooksUpdate);
router.post('/update',multer({
    storage:multer.diskStorage({
        destination:function (req, file, cb) {
                cb(null, 'assets/images')  
          },
        filename:function (req, file, cb) {
                cb(null, Date.now()+'-'+ file.originalname )      
        }
    })
    }).single('image'),guardAuth.isAuth,mybookscontroler.PostgetmybooksUpdate);




module.exports = router;