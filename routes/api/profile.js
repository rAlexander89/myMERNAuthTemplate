//generic routes created. 

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

//@route        GET api/profile/me
//@description   get current user profile
//              register user, add profile
// @access       public

router.get('/me', auth, async (req, res) => {

    try{
        const profile = await Profile.findOne({user: req.user.id})
            .populate('user', ['name'])

        if(!profile){
            return res.status(400).json({ msg: 'There is no profile for this user'})
        }

        res.json(profile)

    } catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


//@route        Post api/profile
//@description   create/update user profile
//              register user, add profile
// @access      private

router.post('/', 
    [auth, [
        check('team', 'Team is required.').not().isEmpty(),
        check('email', 'Email is required.').not().isEmpty(),
        check('cell', 'Cell work number is required.').not().isEmpty(),
        check('counties', 'Counties covered are required.').not().isEmpty()
    ]
    ], 
    async (req, res) =>  {
        debugger
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()})
    }

    const {
        team, 
        email,
        cell,
        counties,
        leads,
        volume,
        comissions
    } = req.body


    // Build profile object

    const profileFields = {}
    profileFields.user = req.user.id

    debugger
    if (team) profileFields.team = team
    if (email) profileFields.email = email
    if (cell) profileFields.cell = cell
    if (counties) {
        profileFields.counties = counties.split(',')
        .map(counties => counties)
    }
    if (leads) {
        profileFields.leads = leads.split(',')
            .map(leads => leads)
    }



    // if (target_demo) profileFields.target_demo = target_demo

    // Build social object --- optional- prebuilt incase needed

    // if (social){

    //     const {
    //         youtube,
    //         twitter,
    //         facebook,
    //         linkedin,
    //         instagram
    //      } = social


    //     profileFields.social = {}
        
    //     if (youtube) profileFields.social.youtube = youtube
    //     if (facebook) profileFields.social.facebook = facebook
    //     if (twitter) profileFields.social.twitter = twitter
    //     if (linkedin) profileFields.social.linkedin = linkedin
    //     if (instagram) profileFields.social.instagram = instagram
    // } 


    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
})

//@route        GET api/profile
//@description   Get all profiles
//             
// @access      public

router.get('/', async (req, res) => {

    try {
        const profiles = await Profile.find().populate('user', ['name'])
        res.json(profiles)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


//@route        GET api/profiles/user/:user_id
//@description   Get profile by user ID
//             
// @access      public

router.get('/user/:user_id', async (req, res) => {


    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name'])

        console.log('logging profile:')
        console.log(profile)
        res.json(profile)

        if (!profile) return res.status(400).json({ msg: 'Profile not found'})

    } catch (err) {
        console.error(err.message)
        if (err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Profile not found'})
        }
        res.status(500).send('Server Error')
    }
})

// @route        DELETE api/profile/
// @description   Delete profile, user & posts
//             
// @access      private

router.delete('/', auth, async (req, res) => {

    try {
        await Profile.findOneAndRemove({ user: req.user.id })
        await User.findOneAndRemove({ _id: req.user.id })
        res.json({ msg: 'User deleted '})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


// @route        PUT api/profile/notes
// @description   Add profile notes
//             
// @access      private

router.put('/notes', [ auth, [
    check('subject', 'Subject is required')
        .not()
        .isEmpty(),
    check('from', 'from is required')
        .not()
        .isEmpty(),
    check('date', 'Body is required')
        .not()
        .isEmpty(),
    check('body', 'Body is required')
        .not()
        .isEmpty()
        ] 
    ], async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }

    
        const {
            subject,
            from,
            date,
            body,
            done
        } = req.body

        const newNote = {
            subject,
            from,
            date,
            body,
            done
        }

        try{
            const profile = await Profile.findOne({ user: req.user.id })
            console.log('log obj')
            console.log(profile)

            // profile.notes.unshift(newNote)
            profile.notes.unshift(req.body)

            await profile.save()


            res.json(profile)

        } catch(err){
            console.error(err.message)
            res.status(500).send('Server Error')
        }

})

// @route        DELETE api/profile/notes/:note_id
// @description   Delete note from profile
//             
// @access      private

router.delete('/notes/:note_id', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id })

        // Get remove index
        const removeIndex = profile.notes.map(item => item.id).indexOf(req.params.notes_id)

        profile.notes.splice(removeIndex, 1)

        await profile.save()
        res.json(profile)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


module.exports = router