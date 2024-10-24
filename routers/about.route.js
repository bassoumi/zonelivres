

const express = require('express');
const aboutcontorler = require('../controllers/about.contorler');
const router = express.Router();






router.get('/',aboutcontorler.getaboutPage);




module.exports = router;
