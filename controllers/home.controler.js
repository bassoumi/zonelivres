const bookModel=require('../models/book.models')


exports.threeBooksController=(req,res,next)=>{

    bookModel.getThreeBooks().then(books=>{
        res.render('index',{
        books:books,
        verifuser:req.session.userId,session: req.session})
    })


}