// controller.js
const express = require('express');
const multer = require('multer');
const fileService = require('./service'); // Import your service module
const { BadRequest } = require('../../utility/errors');

const handleValidation = require('../../middlewares/schemaValidation');

const authService = require('./service');
const { adminValidate } = require('./request');
const roleMiddleware = require('../../middlewares/roleMiddleware');
const authMiddleware = require('../../middlewares/authMiddleware');
const { SHARD_MIND, DEMO_LAB } = require('../../config/constant');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const fileUpload = async (req, res, next) => {
  try {
    const userId = req.body.userId; // Assuming userId is sent in the request body
    const file = req.file;
    console.log('userId:', userId);
    console.log('file:', file);

    if (!userId || !file) {
      throw new BadRequest('userId and file are required');
    }

    const result = await fileService.uploadFile(file, userId);
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Error in file upload:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

router.post('/upload',authMiddleware,
roleMiddleware([SHARD_MIND,DEMO_LAB]),upload.single('file'), fileUpload);

module.exports = router;
