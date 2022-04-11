const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require('bcryptjs')


//Get user's infos
const getUser = asyncHandler(async (req, res) => {
    const {
        name
    } = req.body
    const user = await User.findOne({
        name
    })
    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    res.status(200).json(user)
})

//Connect User

const loginUser = asyncHandler(async (req, res) => {
    const {
        name,
        password
    } = req.body

    const user = await User.findOne({
        name
    })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
        })
    } else {
        res.status(400)
        throw new Error('Invalid login infos')
    }
})

//Create a new user
const registerUser = asyncHandler(async (req, res) => {
    const {
        name,
        password
    } = req.body

    if (!name || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name: name,
        password: hashedPassword,
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
    loginUser,
    registerUser,
    updateUser,
    deleteUser
}