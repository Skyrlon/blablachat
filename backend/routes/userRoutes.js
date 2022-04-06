const express = require("express")
const router = express.Router()
const asyncHandler = require('express-async-handler')

const User = require("../models/userModel")

//Get user's infos
router.get('/', asyncHandler(async (req, res) => {
    const {
        name
    } = req.body
    const user = await User.find({
        name
    })

    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    res.status(200).json(user)
}))

//Create a new user
router.post("/", asyncHandler(async (req, res) => {
    const user = await User.create({
        name: req.body.name,
        password: req.body.password,
    })
    res.status(200).json(user)
}))

//Update user's info
router.put("/:id", asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedUser)
}))

//Delete user
router.delete("/:id", asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }
    await user.remove()
    res.status(200).json({
        id: req.params.id
    })
}))

module.exports = router