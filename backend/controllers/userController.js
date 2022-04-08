const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")


//Get user's infos
const getUser = asyncHandler(async (req, res) => {
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
})


//Create a new user
const registerUser = asyncHandler(async (req, res) => {
    const user = await User.create({
        name: req.body.name,
        password: req.body.password,
    })
    res.status(200).json(user)
})


//Update user's info
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedUser)
})

//Delete user
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }
    await user.remove()
    res.status(200).json({
        id: req.params.id
    })
})

module.exports = {
    getUser,
    registerUser,
    updateUser,
    deleteUser
}