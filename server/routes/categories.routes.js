const Category = require('../models/category.model');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) =>{
    const categoryList = await Category.find();
    if (!categoryList) return res.status(500).json({ success: false });
    res.send(categoryList);
})

router.get('/:id', async (req, res) =>{
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(500).json({ success: false });
    res.send(category);
})

router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    });
    category = await category.save();
    if (!category) return res.status(404).send('the category cannot be created');
})

// router.put('/:id', async (req, res) => {
//     const category = await Category.findByIdAndUpdate(req.params.id,
//         {
//             name: req.body.name,
//             icon: req.body.icon,
//             color: req.body.color
//         }, { new: true })
//     if (!category) return res.status(404).send('the category cannot be changed');
//     res.send(category);
// })

router.put('/:id', (req, res) => { 

    Category
        .findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/:id', (req, res) => {

    const categoryId = req.params.id
    console.log(req.params.id)

    Category
        .findByIdAndDelete(categoryId)
        .then(response => {
            console.log(response)
           return res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router;