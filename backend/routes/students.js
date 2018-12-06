const router = require('express').Router();

const bcrypt = require('bcrypt');
const moment = require('moment');

const encrypt = require('../utilities/encryption');

const Login = require('../models/Login');
const Student = require('../models/Student');

const config = require('../config/config');

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

//TODO Combine in one route: All analytics related stuff ('/getAnalytics')

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

router.get('/getCourseDemographics', async (req, res) => {
   try {
       let demographics = await Student.getStudentCountPerCourse();
       res.status(200).send({ demographics });
   } catch(error) {
       console.error(error);
       res.status(400).send({ error: 'Unable to fetch demographics'});
   }
});

router.get('/getUsers', async (req, res) => {
    try {
        let users = await Student.getAllStudents();
        res.status(200).send({ users });
    } catch(error) {
        console.error(error);
        res.status(400).send({ error: 'Unabled to fetch users' });
    }
});

router.post('/updateStudent/:studentId', async (req, res) => {
    try {
        let user = req.body.user;
        await Student.updateStudent(req.params.studentId, user.name, user.courseId);
    } catch(error) {
        console.error(error);
        res.status(400).send({ error: 'Unable to update student' });
    }
});

router.delete('/deleteStudent/:studentId', async (req, res) => {
    try {
        await Student.deleteStudent(req.params.studentId);
        res.status(200);
    } catch(error) {
        console.error(error);
        res.status(400).send({ error: 'Unable to delete student' });
    }
});

module.exports = router;