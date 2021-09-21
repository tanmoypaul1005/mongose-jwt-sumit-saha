const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const userSchema = require('../schema/userSchema');
const User = new mongoose.model("user", userSchema);

//SIGNUP
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json({
            message: "Signup was successfully"
        });
    } catch {
        res.status(500).json({ message: "Signup Fail" });
    }

});


//LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username });
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password)

            if (isValidPassword) {
                //GENERATE TOKEN
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id,
                }, process.env.JWT_SECRET, {
                    expiresIn: '2h'
                });
                res.status(200).json({
                    "access token": token,
                    "message": "Login was successfully"
                });
            } else {
                res.status(401).json({ message: "Authentication Fail" });
            }
        } else {
            res.status(401).json({ message: "Authentication Fail" });
        }
    }catch {
        res.status(401).json({ message: "Login Fail" });
    }
});

module.exports = router;