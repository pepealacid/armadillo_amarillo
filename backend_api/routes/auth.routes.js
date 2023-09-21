const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth.controller');

router.post('/signup', signup);
router.post('/login', login);

router.get("/verify", (req, res, next) => {
    console.log("Authenticated user data: ", req.payload);
    res.status(200).json(req.payload);
  });

module.exports = router;
