const express = require('express');
const router = express.Router();

//@route        GET api/posts
//@descrition   Test route
//              register user, add profile
// @access      Public
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;