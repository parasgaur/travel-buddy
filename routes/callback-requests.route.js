let uniqid = require('uniqid');
//we imported the object and then to use the class we work with key called CallbackRequest
let CallbackRequest  = require('../models/callback-requests.model').CallbackRequest;
let express = require('express');

//express has a special object called router, with the help of which we can redirect request from one file to another
let router = express.Router();
let authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, resp) => {
    resp.send(await CallbackRequest.find());
});


router.post('/', async (req, resp) => {
    let reqBody = req.body;
    let newRequest = new CallbackRequest({
        id: uniqid(),
        phoneNumber: reqBody.phoneNumber,
        date: new Date()
    })
    await newRequest.save();
    resp.send('Accepted');
});


router.delete('/:id', authMiddleware, async (req, resp) => {
    await CallbackRequest.deleteOne({id: req.params.id});
    resp.send('Deleted');
});

module.exports = router;