

const mongoose = require('mongoose'); // Importation de mongoose










exports.getContactPage=(req,res,next)=>{
    res.render('contact',{verifuser:req.session.userId})
}