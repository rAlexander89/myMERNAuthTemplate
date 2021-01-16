const express = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../../models/User')

//@route        POST api/users
//@descrition   test route
//              register user, add profile
// @access      public
router.post('/', 
    [
    check('name', 'Name is required')
    .not()
    .isEmpty(),
    check(
        'email', 'Please include a valid email'
        ).isEmail(),
    check(
        'password', 'Please enter a password with a minimum of 6 or more characters'
        ).isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const { name, email, password, contact, companyName } = req.body

        try{
            let user = await User.findOne({
                email
            })

            if (user){
                res.status(400).json({
                    errors: [{ msg: 'User already exists'}]
                })
            }

            user = new User({
                name,
                email,
                password,
                contact,
                companyName
            })

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt)
            await user.save();


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