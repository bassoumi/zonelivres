

const express = require('express');
const contactcontroller = require('../controllers/contact.controler');
const router = express.Router();






router.get('/',contactcontroller.getContactPage);




module.exports = router;
