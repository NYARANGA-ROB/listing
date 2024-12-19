const express = require('express');
const { createListing, deleteListing, updateListing, getAllListings,getListing} = require('../controllers/listing.controller');
const { verifyToken } = require('../utils/verifyUsers');

const router = express.Router();

router.post('/create',verifyToken,createListing);
router.delete('/delete/:id',verifyToken, deleteListing);
router.post('/update/:id',verifyToken, updateListing);
router.get('/getListing/:id', getListing);
router.get('/get', getAllListings);

module.exports =  router;