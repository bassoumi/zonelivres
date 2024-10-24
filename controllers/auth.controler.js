
const authModel = require('../models/auth.model')


exports.getRegister = (req, res, next) => {
    res.render('register', { verifuser: req.session.userId, message: req.flash('error')[0] });
}

exports.postRegisterData = (req, res, next) => {
    console.log(req.body); // Log the body to check if data is being received
    authModel.registerFunctionModel(req.body.name, req.body.email, req.body.password)
        .then(() => {
            res.redirect('/login');
        })
        .catch((msg) => {
            req.flash('error', msg);
            res.redirect('/register');
        });
};


exports.getloginPage=(req,res,next)=>{
    res.render('login', { verifuser: req.session.userId, message: req.flash('error')[0] });
}


exports.postLoginData = (req, res, next) => {
    authModel.LoginFunctionModel(req.body.email,req.body.password)
        .then((id) => {
            req.session.userId = id; 
            res.redirect('/');
        })
        .catch((msg) => {
            req.flash('error',msg)
            res.redirect('/login');
        });
};



exports.LogoutFunitionController = (req, res, next) => {
req.session.destroy(()=>{
    res.redirect('/login')
})
};
