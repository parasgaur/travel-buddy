let uniqid = require('uniqid');
//we imported the object and then to use the class we work with key called Post
let Post  = require('../models/post.model').Post;
let express = require('express');

//express has a special object called router, with the help of which we can redirect request from one file to another
let router = express.Router();
let authMiddleware = require('../middleware/auth');

router.get('/', async (req, resp)=>{
    let posts = await Post.find();
    resp.send(posts);
});

router.get('/:id', async (req, resp) => {
    let id = req.params.id;
    let post = await Post.findOne({id: id});
    resp.send(post);
})


router.post('/', authMiddleware, async (req, resp) => {
    let reqBody = req.body;
    let imgPath;
    if(reqBody.imageURL){
        imgPath = reqBody.imageURL;
    }
    else{
        imgPath = req.file.path.substring(7, req.file.path.length);
    }

    let newPost = new Post({
        id: uniqid(),
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: imgPath
    })
    await newPost.save();
    resp.send('Created');
});

router.delete('/:id', authMiddleware, async (req, resp) => {
    let id = req.params.id;
    await Post.deleteOne({id: id});
    resp.send('Deleted');
});

router.put('/:id', authMiddleware, async (req, resp) => {
    let id = req.params.id;
    await Post.updateOne({id: id}, req.body);
    resp.send('Updated');
});

module.exports = router;
