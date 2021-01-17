const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

const User = require('../../models/User')
const Profile = require('../../models/Profile')
const Post = require('../../models/Posts')

//@route        POST api/posts
//@descrition   Create a post
//              
// @access      Public
router.post('/', [ auth, [
    check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
    ], 
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }

        
        try{
            const user = await User.findById(req.user.id).select('-password')

            const newPost = new Post ({
                text: req.body.text,
                name: user.name,
                user: req.user.id
            })

            const post = await newPost.save()

            res.json(post)

        } catch(err){
            console.error(err.message)
            res.status(500).send('Server Error')
        }
    }
)

//@route        GET api/posts
//@descrition   Get all posts
//              
// @access      private

router.get('/', auth, async (req, res) => {
    try{
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)


    } catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})



//@route        GET api/posts/:id
//@descrition   Get post by post id
//              
// @access      private

router.get('/:id', auth, async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)

        if (!post){
            return res.status(404).json({ msg: 'Post not found'})
        }

        res.json(post)


    } catch(err){
        console.error(err.message)
        if (err.kind === 'ObjectId'){
            return res.status(404).json({ msg: 'Post not found'})
        }
        res.status(500).send('Server Error')
    }
})



//@route        DELETE api/posts/:id
//@descrition   Delete a post
//              
// @access      private

router.delete('/:id', auth, async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        
        if (!post){
            return res.status(404).json({ msg: 'Post not found'})
        }

        if (post.user.toString() !== req.user.id){
            return res.status(400).json({ msg: 'User not authorized'})
        }

        await post.remove()

        res.json({ msg: 'Post removed' })


        res.json(post)


    } catch(err){
        console.error(err.message)
        if (err.kind === 'ObjectId'){
            return res.status(404).json({ msg: 'Post not found'})
        }
        res.status(500).send('Server Error')
    }
})


//@route        PUT api/posts/like/:id
//@descrition   Like a post
//              
// @access      private

router.put('/like/:id', auth, async (req, res) => {

    try{
        const post = await Post.findById(req.params.id)
        
        if (!post){
            return res.status(404).json({ msg: 'Post not found'})
        }
        
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({ msg: 'Post already liked'})
        }

        post.likes.unshift({ user: req.user.id })

        await post.save()

        res.json(post.likes)
        

    } catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//@route        PUT api/posts/like/:id
//@descrition   Unlike a post
//              
// @access      private

router.put('/unlike/:id', auth, async (req, res) => {

    try{
        const post = await Post.findById(req.params.id)
        
        if (!post){
            return res.status(404).json({ msg: 'Post not found'})
        }

        //check to see if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({ msg: 'Post has not yet been liked'})
        }

        // Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

        // splice out that like, bro!
        post.likes.splice(removeIndex, 1)

        // post.likes.unshift({ user: req.user.id })
        await post.save()
        res.json(post.likes)
        

    } catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})



//@route        DELETE api/posts/comment/:post_id/:comment_id
//@descrition   Delete a comment on a post
//              
// @access      Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {

    try{
        const post = await Post.findById(req.params.id)

        const comment = post.comments.find( comment => comment.id == req.params.comment_id)

        if(!comment){
            return res.status(404).json({ msg: 'Comment not found'})
        }

        if( comment.user.toString() !== req.user.id ){
            return res.status(401).json({ msg: 'User not authorized'})
        }

        // Get remove index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)

        // splice out that comment, bro!
        post.comments.splice(removeIndex, 1)

        // post.comments.unshift({ user: req.user.id })
        await post.save()
        res.json(post.comments)
        

    } catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


router.post('/comment/:id', [ auth, [
    check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
    ], 
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }

        
        try{
            const user = await User.findById(req.user.id).select('-password')
            const post = await Post.findById(req.params.id)

            const newComment = {
                text: req.body.text,
                name: user.name,
                user: req.user.id
            }

            post.comments.unshift(newComment)

            post.save()

            res.json(post.comments)

        } catch(err){
            console.error(err.message)
            res.status(500).send('Server Error')
        }
    }
)

module.exports = router;