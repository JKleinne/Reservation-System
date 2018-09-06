const router = require('express').Router();
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../models/User');
const { isAuthenticated } = require('../middlewares/authentication');

/*
 * Passport functionalities
 */
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            let user = await User.getUserByUsername(username);

            if(!user) return done(null, false);

            let isValid = await bcrypt.compare(password, user.password);

            if(!isValid) return done(null, false);

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
    User.getUserById(id)
        .then((err, user) => {
        done(err, user);
    });
});


/*
 * Routes
 */
router.post('/signup', async (req, res) => {
    // Validate request before calling db

    // Call db to add new user
    try {
        await User.addUser(req.body.name, req.body.phone, req.body.email, req.body.studentId);
    } catch(error) {
        throw {
            message: error.message
        }
    }
});

//TODO redirection -> User homepage
router.post('/login', passport.authenticate('local',
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