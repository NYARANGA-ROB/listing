const express = require('express');
const { signup, signin, google, signOut } = require('../controllers/auth.controller');
const router = express.Router();

console.log(signup);
router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google",google)
router.get("/signout",signOut)
// console.log(signup);

module.exports =  router;