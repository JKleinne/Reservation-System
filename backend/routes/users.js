const router = require('express').Router();
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const Student = require('../models/Student');
const encrypt = require('../utilities/encryption');
const { isAuthenticated } = require('../middlewares/authentication');

/*
 * Passport functionality
 */
passport.use('local-login', new LocalStrategy(
    async (id, password, done) => {
        try {
            let user = await Student.getStudentById(id);

            // If user with given username was not found, pass false
            if(!user) return done(null, false);

            /*
             * Compare the hashed password used for login and the hashed password
             * already in the database, linked to the user
             */
            let isValid = await bcrypt.compare(await encrypt.hash(password), user.password);

            // If they are not identical, pass false
            if(!isValid) return done(null, false);

            // else pass the user object
            return done(null, user);
        } catch(error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Student.getStudentById(id)
        .then((err, user) => {
        done(err, user);
    });
});


/*
 * Routes
 */
router.post('/signup', async (req, res) => {
    const hashedPW = await encrypt.hash(req.body.password);

    // Call db to add new user
    try {
        await Student.addStudent(req.body.id, hashedPW, req.body.fullName,
                                    req.body.courseId);
        let result = await Student.getStudentById("1640380");
        res.send( result[0] );
    } catch(error) {
        console.error(error.message + error.stack);
    }
});

//TODO redirection -> User homepage
router.post('/login', passport.authenticate('local-login',
    {successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
        (req, res) => {
        res.redirect('/home');
    });

router.get('/logout', function (req, res) {
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});

/*
 * For any endpoints that has to be hidden unless authenticated
 */
//router.post('/getHistory', isAuthenticated, () => {});

module.exports = router;