const User = require('../models/user.model');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) =>{
    const userList = await User.find().select('-passwordHash')
    if (!userList) return res.status(500).json({ success: false });
    res.send(userList);
})

router.get('/:id', async (req, res) =>{
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) return res.status(500).json({ success: false });
    res.send(user);
})

router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        //passwordHash: await bcrypt.hashSync(req.body.passwordHash, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    });
    user = await user.save();
    if (!user) return res.status(404).send('the category cannot be created');
    res.send(user);
})

router.post('/login', async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!user) {
        return res.status(400).send('The user not found');
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
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