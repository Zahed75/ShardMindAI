const express = require('express');
const router = express.Router();

//middlewares
const authVerifyMiddleware = require('../middlewares/authMiddleware.js');


//routes
const authRoute = require('../modules/Auth/controller');
const userRoute=require('../modules/User/controller');
const fileRoute=require('../modules/FileUpload/controller.js');

// Root End Point
router.use('/auth', authRoute);
router.use('/user',userRoute);
router.use('/storage',fileRoute);

module.exports = router;
