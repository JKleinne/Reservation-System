const router = require('express').Router();
const axios = require('axios');
const db = require('../database/database');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
    // Validate request before calling db

    // Call db to add new user
    try {
        await User.addUser(req.body.name, req.body.phone, req.body.email, req.body.studentId);
    } catch(error) {
        console.error(error);
    }
});

module.exports = router;