const mongoose = require('mongoose'); // Importation de mongoose










exports.getaboutPage=(req,res,next)=>{
    res.render('about',{verifuser:req.session.userId})
}