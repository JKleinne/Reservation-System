const moment = require('moment');

const router = require('express').Router();
const Admin = require('../models/Admin');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const encrypt = require('../utilities/encryption');
const bcrypt = require("bcrypt");
const Login = require("../models/Login");

router.post('/twofactor/setup', function(req, res){
    const secret = speakeasy.generateSecret({length: 10});
    QRCode.toDataURL(secret.otpauth_url, (err, data_url)=>{
        //save to logged in user.
        user.twofactor = {
            secret: "",
            tempSecret: secret.base32,
            dataURL: data_url,
            otpURL: secret.otpauth_url
        };
        return res.json({
            message: 'Verify OTP',
            tempSecret: secret.base32,
            dataURL: data_url,
            otpURL: secret.otpauth_url
        });
    });
});

router.post('/twofactor/verify/:adminId/:token', async (req, res) => {
    const admin = await Admin.getAdmin(req.params.adminId);

    const verified = speakeasy.totp.verify({
        secret: admin.twoFAsecret,
        encoding: 'base32',
        token: req.params.token
    });

    if(verified){
        return res.status(200).send({ verified: true });
    }
    return res.status(400).send({ verified: false });
});

router.post('/addAdmin/:id/:name/:password', async (req, res) => {
    try {
        const id = req.params.id;
        const password = await encrypt.hash(req.params.password);
        const name = req.params.name;
        const secret = await speakeasy.generateSecret({length: 30});

        await Admin.addAdmin(id, name, password, secret.base32);

        const qrCode = await QRCode.toDataURL(secret.otpauth_url);

        res.send({ qrCode });
    } catch(error) {
        console.error(error);
        res.status(400);
    }
});

router.get('/getAdmins', async (req, res) => {
    try {
        let admins = await Admin.getAllAdmins();
        res.status(200).send({ admins });
    } catch(error) {
        console.error(error);
        res.status(400).send({ error: 'Unabled to fetch admins' });
    }
});

router.post('/login', async (req, res) => {
    let studentId = req.body.id;
    let password = req.body.password;

    let user = await Admin.getAdmin(studentId);

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

module.exports = router;