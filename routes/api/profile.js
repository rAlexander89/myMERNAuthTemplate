const express = require('express');
const router = express.Router();

//@route        GET api/profile
//@descrition   Test route
//              register user, add profile
// @access      Public
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;