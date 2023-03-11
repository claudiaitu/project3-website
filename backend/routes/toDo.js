var express = require('express');
var router = express.Router();

const User = require('../models/User')

const ToDo = require('../models/ToDo');


router.post('/add-task/:userId', async (req, res, next) => {
    const createdTask = await ToDo.create({
        title: req.body.title,
        user: req.params.userId
        // image: req.file.image
    })
    const findUserandUpdate = await User.findByIdAndUpdate(req.params.userId, {$push:{tasks: createdTask._id}}, {new: true}).populate('tasks')
    console.log(findUserandUpdate)
    res.json(findUserandUpdate)
})


// router.post('/edit-registry/:registryId/:userId', async (req, res, next) => {
//     try {
//         const updateRegistry = await Registry.findByIdAndUpdate( req.params.registryId, {
//             title: req.body.title,
//             price: req.body.price,
//             description: req.body.description,
//             user: req.params.userId
//             // image: req.file.image
//         }, {new: true})
//         const findUser = await User.findById(req.params.userId) .populate('registries')
//         res.json(findUser)
//     }
//     catch(error){console.log(error)}
// })

router.get('/delete-task/:taskId/:userId', async (req, res, next) => {
    try {
        
        
        const deleteTask = await ToDo.findByIdAndDelete( req.params.taskId)
        const findUserandUpdate = await User.findByIdAndUpdate( req.params.userId, {$pull:{tasks:deleteTask._id}}, 
            {new: true}).populate('tasks')
        res.json(findUserandUpdate)

        // const findUser = await User.findById(req.params.userId) .populate('registries')
        // res.json(findUser)
    }
    catch(error){console.log(error)}
})




module.exports = router;
