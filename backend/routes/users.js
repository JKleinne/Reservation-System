const router = require('express').Router();
const axios = require('axios');
const db = require('../database/database');

router.post('/signup', async (req, res) => {
    // Validate request before calling db
    let result = await db.query('SELECT * FROM users');

    // Call db to add new user
});

module.exports = router;