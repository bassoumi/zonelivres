

const mongoose = require('mongoose'); // Importation de mongoose
const bookModel=require('../models/book.models')









exports.getmybooksPage=(req,res,next)=>{
    bookModel.getMyBooks(req.session.userId).then((books)=>{
        console.log(books)
        console.log(req.session.userId)
        res.render('mybooks',{books:books,verifuser:req.session.userId});
    })
 
}


exports.deletebookcontroler=(req,res,next)=>{


id = req.params.id
bookModel.deleteBook(id).then((result)=>{
    res.redirect('/mybooks')
    }).catch((err)=>{
        console.log(err)
        })

}


exports.getmybooksUpdate=(req,res,next)=>{
    let id=req.params.id
    bookModel.getPageUpdateBookModel(id).then((book)=>{
        console.log(book)
        res.render('updateBook',{book:book,verifuser:req.session.userId,Smessage:req.flash('Successmessage')[0],Emessage:req.flash('Errormessage')[0]})
    })

    
     
}



// Contrôleur pour gérer la mise à jour d'un livre
exports.PostgetmybooksUpdate = (req, res, next) => {
    const bookId = req.body.bookId;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        req.flash('Errormessage', "ID de livre invalide.");
        return res.redirect(`/mybooks/update/${bookId}`);
    }

    if (req.file) {
        bookModel.postUpdateBookModel(
            bookId,
            req.body.title,
            req.body.description,
            req.body.author,
            req.body.price,
            req.file.filename,
            req.session.userId
        ).then((msg) => {
            req.flash('Successmessage', msg);
            res.redirect(`/mybooks${bookId}`);
        }).catch((err) => {
            req.flash('Errormessage', err);
            res.redirect(`/mybooks/update/${bookId}`);
        });
    } else {
        bookModel.postUpdateBookModel(
            bookId,
            req.body.title,
            req.body.description,
            req.body.author,
            req.body.price,
            req.body.oldImage,
            req.session.userId
        ).then((msg) => {
            req.flash('Successmessage', msg);
            res.redirect(`/mybooks`);
        }).catch((err) => {
            req.flash('Errormessage', err);
            res.redirect(`/mybooks/update/${bookId}`);
        });
    }
};





const convertFirstPageToImage = async (pdfFilePath, outputImagePath) => {
    const options = {
        density: 100,
        saveFilename: "cover",
        savePath: outputImagePath,
        format: "png",
        width: 600,
        height: 800
    };

    const storeAsImage = fromPath(pdfFilePath, options);
    return storeAsImage(1)
        .then((response) => {
            return response.path;  // Retourne le chemin de l'image
        })
        .catch((error) => {
            console.error("Erreur lors de la conversion du PDF:", error);
        });
};