const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/User.js")

router.get("/sign-up", (req, res)=> {
    res.render("auth/sign-up.ejs")
})

router.post("/sign-up", async (req,res)=> {
    // res.send("Form data submitted")

    // Check if User exsists
    const userInDatabase = await User.findOne({username: req.body.username})
    if(userInDatabase) {
        res.send("Username is Already Taken")
    }
    // Check if passwords match
    if (req.body.password !== req.body.confirmPassword) {
        return res.send("Password and Confirm Password must match");
      }
    // Hash the password
      const hashedPassword = bcrypt.hashSync(req.body.password, 10)
      req.body.password = hashedPassword

    const user = await User.create(req.body)
    res.send(`Thanks for signing up ${user.username}`)
})

module.exports = router