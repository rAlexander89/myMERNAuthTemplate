const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../../models/User')

//@route        GET api/auth
//@descrition   Test route
//              register user, add profile
// @access      Public

router.get('/', auth, async (req, res) => {
    
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)

    } catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});


//@route        POST api/auth
//@descrition   authenticate user & get token
// @access      public

router.post('/', 
    [
        check(
            'email', 'Please include a valid email.'
            ).isEmail(),
        check(
            'password', 'Password is required.'
            ).exists()
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const { email, password } = req.body

        try{
            let user = await User.findOne({
                email
            })

            if (!user){
                res.status(400)
                    .json({
                    errors: [{ msg: 'Invalid credentials.'}]
                })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch){
                 res.status(400)
                    .json({
                    errors: [{ msg: 'Invalid credentials.'}]
                })
            }

            const payload = {
               user: {
                   id: user.id
               }
           }

           jwt.sign( 
               payload, 
               config.get('jwtSecret'),
               { expiresIn: 86400 },
               (err, token) => {
                   if (err) throw err;
                   res.json({ token })
               }
                 )

        } catch(err){
            console.error(err.message)
            res.status(500).send('Server error')
        }
})




module.exports = router;