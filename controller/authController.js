const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const cors = require('cors');
const jwt = require('jsonwebtoken');
process.env.SECRET_KEY = 'secret'


module.exports = ({
    home: async function (req, res) {
        try {
            res.status(200).send("hello aws");

        } catch (err) {
            console.log(err);
        }
    },
    register: async function (req, res) {
        try {
            const { name, email, password } = req.body;
            User.findOne({ email: email }).then(user => {
                if (user) {
                    res.status(404).json({ status: "error", "message": "Email is already in use", data: null  })
                } else {
                    const newUser = new User({
                        name, email, password
                    });
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        newUser.save(function (err, user) {
                            if (err) {
                                res.send('error:' + err);
                            } else {
                                res.json({
                                    "message": "successfully registered",
                                    "userEmail": user.email,
                                    "userId": user.id
                                })
                            }
                        })
                    }))
                }
            })
            // res.json({"name":name,"email":email,"password":password});

        } catch (err) {
            console.log(err);
        }
    },

    login: async function (req, res, next) {

        try {
            User.findOne({
                email: req.body.email
            }, function (err, user) {
                if (err) {
                    next(err);

                } else {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        const token = jwt.sign({ id: user._id },
                            process.env.SECRET_KEY, { expiresIn: '1h' });

                        res.json({
                            status: "success", "message": "user is authenticate",
                            data: { user: user, token: token }
                        });
                    } else {
                        res.json({ status: "error", "message": "Invalid email and password", data: null });
                    }
                }
            });

        } catch (err) {
            console.log(err);
        }


    },

    profile: async function(req, res,next){
        var decoded = jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)

        User.findOne({ 
            _id:decoded._id
        }).then(user=>{
            if(user){
                res.json(user)
            }else{
                res.json({"error":"User not found"});
            }
        }).catch(err =>{
            res,send('error',err);
        })
        
    }
})