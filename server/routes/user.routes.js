const User = require('../models/user.model');
const express = require('express');
const router = express.Router();
//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require("passport")
const bcrypt = require("bcrypt")

router.get('/', async (req, res) =>{
    const userList = await User.find().select('-password')
    console.log(userList);
    if (!userList) return res.status(500).json({ success: false });
    res.send(userList);
})

router.get('/:id', async (req, res) =>{
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(500).json({ success: false });
    res.send(user);
})

router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        //password: await bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
        username: req.body.username
    });
    user = await user.save();

    if (!user) return res.status(404).send('the category cannot be created');
    res.send(user);
})

//Signup
router.post('/signup', (req, res) => {

    const { name, username, email, phone, isAdmin, street, apartment, zip, city, country, password } = req.body

    if (!username || !password) {
        res.status(400).json({ message: 'Rellena todos los campos' })
        return
    }

    if (password.length < 2) {
        res.status(400).json({ message: 'Contraseña insegura' })
        return
    }

    User
        .findOne({ username })
        .then(foundUser => {
            if (foundUser) {
                res.status(400).json({ message: 'El usuario ya existe' })
                return
            }

            const salt = bcrypt.genSaltSync(10)
            const hashPass = bcrypt.hashSync(password, salt)

        return User 
            .create({ name, username, email, phone, isAdmin, street, apartment, zip, city, country, password: hashPass })
            .then(newUser => req.login(newUser, err => err ? res.status(500).json({ message: 'Error al iniciar sesión' }) : res.status(200).json(newUser)))
            .catch(() => res.status(500).json({ message: 'Error saving user to DB' }))
        })
})

//Login
router.post('/login', async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!user) {
        return res.status(400).send('The user not found');
    }

    if(user) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '1d'}
        )
       
        res.status(200).send({user: user.email , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }
    
})


router.put('/:id', (req, res) => { 

    User
        .findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/:id', (req, res) => {

    const userId = req.params.id
    console.log(req.params.id)

    User
        .findByIdAndDelete(userId)
        .then(response => {
            console.log(response)
           return res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router;