let uniqid = require('uniqid');
//we imported the object and then to use the class we work with key called Email
let Email  = require('../models/email.model').Email;
let express = require('express');

//express has a special object called router, with the help of which we can redirect request from one file to another
let router = express.Router();
let authMiddleware = require('../middleware/auth');

router.get('/',authMiddleware, async (req, resp) => {
    resp.send(await Email.find());
});


router.post('/', async (req, resp) => {
    let reqBody = req.body;
    let newRequest = new Email({
        id: uniqid(),
        name: reqBody.name,
        text: reqBody.text,
        email: reqBody.email,
        date: new Date()
    })
    await newRequest.save();
    resp.send('Accepted');
});


router.delete('/:id', authMiddleware, async (req, resp) => {
    await Email.deleteOne({id: req.params.id});
    resp.send('Deleted');
});

module.exports = router;