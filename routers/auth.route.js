const route = require('express').Router();
const authControler=require('../controllers/auth.controler')
const body=require('express').urlencoded({extended:true})
const guradAuth =require('./guard.auth')
// Define the route for registration
route.get('/register',authControler.getRegister)
route.post('/register', body, authControler.postRegisterData);
route.get('/login',guradAuth.notAuth,authControler.getloginPage)
route.post('/login',body,authControler.postLoginData)



route.post('/logout',body,authControler.LogoutFunitionController)




module.exports = route;
