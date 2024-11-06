const express = require('express');
const {register, login, logout} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.get('/dashboard', authMiddleware, (req, res) => {
    res.render('dashboard', {user: req.session.user});
});

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
