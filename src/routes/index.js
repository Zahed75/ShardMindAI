const express = require('express');
const router = express.Router();

//middlewares
const authVerifyMiddleware = require('../middlewares/authMiddleware.js');


//routes
const authRoute = require('../modules/Auth/controller');
const userRoute=require('../modules/User/controller');


// Root End Point
router.use('/auth', authRoute);
router.use('/user',userRoute);

module.exports = router;
