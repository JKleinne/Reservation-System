const router = require('express').Router();

const bcrypt = require('bcrypt');
const moment = require('moment');

const encrypt = require('../utilities/encryption');

const Login = require('../models/Login');
const Student = require('../models/Student');

/*
 * Routes
 */
router.post('/signup', async (req, res) => {
    const hashedPW = await encrypt.hash(req.body.password);
    try {
        await Student.addStudent(req.body.id, hashedPW, req.body.fullName,
                                    req.body.courseId);
        res.status(200);
        res.send({user: await Student.getStudentById(req.body.id)});
    } catch(error) {
        console.error(error.message + error.stack);
        res.status(400).send({error: 'Unable to signup'})
    }
});

router.post('/login', async (req, res) => {
    let studentId = req.body.id;
    let password = req.body.password;

    let user = await Student.getStudentById(studentId);

    if(!user) {
        res.status(401).send({error: "User not found"});
    }

    let isValid = await bcrypt.compare(password, user.password);

    if(!isValid) {
        res.status(401).send({error: "Incorrect password"});
    }
    else {
        await Login.addLogin(moment().format('YYYY-MM-DD hh:mm:ss'), studentId);

        res.status(200).send({
            user,
            isLogged: true
        });
    }
});

//TODO Logout route

router.get('/getUser/:studentId', async (req, res) => {
    try {
        let user = await Student.getStudentById(req.params.studentId);
        res.status(200).send({ user });
    } catch(error) {
        console.error(error);
        res.status(400).send({ error: 'User not found' });
    }
});

router.post('/getLoginsByDate/:date', async (req, res) => {
    try {
        let logins = await Login.getLoginsByDate(req.params.date);
        res.status(200).send({ logins });
    } catch(error) {
        console.error(error);
        res.status(400).send({ error: 'Unable to fetch logins' });
    }
});

module.exports = router;