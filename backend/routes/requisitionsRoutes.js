const express = require('express');
const { getRequisitions, createRequisition } = require('../controllers/requisitionsController');
const router = express.Router();


router.get('/', getRequisitions);
router.post('/', createRequisition);

module.exports = router;