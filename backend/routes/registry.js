var express = require('express');
var router = express.Router();

const User = require('../models/User')

const Registry = require('../models/Registry');


router.post('/add-registry/:userId', async (req, res, next) => {
    const createdRegistry = await Registry.create({
        item: req.body.item,
        price: req.body.price,
        description: req.body.description,
        user: req.params.userId,
        image: req.body.image
    })
    const findUserandUpdate = await User.findByIdAndUpdate(req.params.userId, {$push:{registries: createdRegistry._id}}, {new: true}).populate('registries')
    console.log(findUserandUpdate)
    res.json(findUserandUpdate)
})


router.post('/edit-registry/:registryId/:userId', async (req, res, next) => {
    try {
        const updateRegistry = await Registry.findByIdAndUpdate( req.params.registryId, {
            item: req.body.item,
            price: req.body.price,
            description: req.body.description,
            user: req.params.userId,
            image: req.file.image
        }, {new: true})
        const findUser = await User.findById(req.params.userId) .populate('registries')
        res.json(findUser)
    }
    catch(error){console.log(error)}
})

router.get('/delete-registry/:registryId/:userId', async (req, res, next) => {
    try {
        
        
        const deleteRegistry = await Registry.findByIdAndDelete( req.params.registryId)
        const findUserandUpdate = await User.findByIdAndUpdate( req.params.userId, {$pull:{registries:deleteRegistry._id}}, 
            {new: true}).populate('registries')
        res.json(findUserandUpdate)

        // const findUser = await User.findById(req.params.userId) .populate('registries')
        // res.json(findUser)
    }
    catch(error){console.log(error)}
})




module.exports = router;
