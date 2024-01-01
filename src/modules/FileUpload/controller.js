// controller.js
const express = require('express');
const multer = require('multer');
const fileService = require('./service');
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

//Upload File 

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


// GetAll File by  user



const getAllFiles = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is part of the URL params
    const files = await fileService.getAllFiles(userId);

    if (!files.length) {
      return res.status(404).json({ success: false, message: 'No files found for the user' });
    }

    return res.status(200).json({ success: true, files });
  } catch (error) {
    console.error('Error getting files:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};




//Remove File

const removeFile = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is part of the URL params
    const fileKey = req.params.fileKey; // Assuming fileKey is part of the URL params

    if (!userId || !fileKey) {
      return res.status(400).json({ success: false, message: 'userId and fileKey are required' });
    }

    const result = await fileService.removeFile(userId, fileKey);

    return res.status(200).json({ success: true, message: 'File removed successfully', result });
  } catch (error) {
    console.error('Error removing file:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



router.get('/files/:userId', getAllFiles);
router.post('/upload',authMiddleware,
roleMiddleware([SHARD_MIND,DEMO_LAB]),upload.single('file'), fileUpload);

router.delete('/files/:userId/:fileKey', removeFile);
module.exports = router;
