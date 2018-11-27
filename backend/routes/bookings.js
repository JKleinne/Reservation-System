const router = require('express').Router();
const Booking = require('../models/Booking');

router.get('/getBookings', async (req, res) => {
    try {
        res.status(200).send({ bookings: await Booking.getBookings() });
    } catch(error) {
        console.error(error.message + error.stack);
        res.status(400).send({error: 'Unable to get bookings'})
    }
});

router.post('/getBookingsByStudentId/:studentId', async (req, res) => {
    try {
        res.status(200).send({ bookings: await Booking.getBookingsByStudentId(req.params.studentId) })
    } catch(error) {
        console.error(error.message + error.stack);
        res.status(400).send({error: 'Unable to get bookings'})
    }
});

router.post('/getBookingsByMonth/:month', async (req, res) => {
    try {
        res.status(200).send({ bookings: await Booking.getBookingsByMonth(req.params.month) });
    } catch(error) {
        console.error(error.message + error.stack);
        res.status(400).send({error: 'Unable to get bookings'})
    }
});

module.exports = router;