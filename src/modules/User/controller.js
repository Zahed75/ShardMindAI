const express = require('express');
const router = express.Router();

const userService = require('./service');

const {
  changeUserDetailsValidate,
  changePasswordValidate,
} = require('./request');

const authMiddleware = require('../../middlewares/authMiddleware');
const handleValidation = require('../../middlewares/schemaValidation');












module.exports = router;
