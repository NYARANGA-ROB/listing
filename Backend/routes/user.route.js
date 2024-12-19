const express = require('express');
const { test, updatedUser, deleteUser, getUserListing, getUser} = require('../controllers/user.controller');
const { verifyToken } = require('../utils/verifyUsers');

const router = express.Router();

router.get("/",test);
router.post("/update/:id", verifyToken ,updatedUser);
router.delete("/delete/:id", verifyToken ,deleteUser);
router.get("/listings/:id", verifyToken ,getUserListing);
router.get("/:id", verifyToken ,getUser);

module.exports =  router;