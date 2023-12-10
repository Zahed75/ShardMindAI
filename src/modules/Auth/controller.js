const express = require('express');
const router = express.Router();

const handleValidation = require('../../middlewares/schemaValidation');

const authService = require('./service');
const { adminValidate } = require('./request');
const roleMiddleware = require('../../middlewares/roleMiddleware');
const authMiddleware = require('../../middlewares/authMiddleware');


const userSignup = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);

    res.status(201).json({
      email: user.email,
      user,
      message: 'OTP is sent to your email. Please Check your email',
    });
  } catch (err) {
    next(err, req, res);
  }
};

// User OTP Verify

const verifyOTP = async (req, res, next) => {
  try {
    await authService.optVerification(req.body);

    res.status(200).json({
      message: 'Verification successfull',
    });
  } catch (err) {
    next(err, req, res);
  }
};



//user signin

const userSignin = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authService.signinUser(
      req.body
    );

    res.cookie('currentUserRole', user.role, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });


    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      accessToken,
      user,
      message: 'User logged in successfully',
    });
  } catch (err) {
    next(err, req, res);
  }
};



//Resend OTP
const resendOTP = async (req, res, next) => {
  try {
    await authService.resendOtp(req.body);

    res.status(200).json({
      message: 'OTP resent to your email',
    });
  } catch (err) {
    next(err, req, res);
  }
};






//Expire OTP
const expireOTP = async (req, res, next) => {
  try {
    await authService.expireOTP(req.body);

    res.status(200).json({
      message: 'OTP expired',
    });
  } catch (err) {
    next(err, req, res);
  }
};


//Get Refresh Token

const refreshTokenHandler = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await authService.getAccessToken(
      req.cookies,
      res.clearCookie('jwt', { httpOnly: true })
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    console.log({ err });
    next(err, req, res);
  }
};

//Logout Handler

const logoutHandler = async (req, res, next) => {
  try {
    const isUser = await authService.findUserByCookie(req.cookies);
    if (!isUser) {
      res.clearCookie('jwt', { httpOnly: true });
      res.clearCookie('currentUserRole', { httpOnly: true });
      return res.sendStatus(204);
    }
    await authService.removeRefreshToken(isUser.refreshToken);
    res.clearCookie('jwt', { httpOnly: true });
    res.clearCookie('currentUserRole', { httpOnly: true });

    res.sendStatus(204);
  } catch (err) {
    next(err, req, res);
  }
};

router.post('/register', handleValidation(adminValidate), userSignup);
router.post('/user/signin', userSignin);
router.get('/logout', logoutHandler);
router.post('/otp/verify', verifyOTP);
router.post('/otp/resend', resendOTP);
router.post('/otp/expire', expireOTP);
router.get('/refresh', refreshTokenHandler);


module.exports = router;
