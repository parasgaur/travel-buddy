//we imported the object and then to use the class we work with key called Post
let User  = require('../models/user.model').User;
let express = require('express');
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');

//express has a special object called router, with the help of which we can redirect request from one file to another
let router = express.Router();

router.post('/login', async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;

    let users = await User.find().where({email: email});

    if(users.length > 0){
        let comparisonResult = await bcrypt.compare(password, users[0].password);
        if(comparisonResult){
            let token = auth.generateToken(users[0]);
            resp.cookie('auth_token', token);
            resp.send({
                redirectURL: '/admin',
                message : 'Success'
            });
        }
        else{
            resp.send({message: 'Rejected'});
        }
    }
    else{
        resp.send({message: 'Rejected'});
    }
})


router.post('/register', async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;

    let users = await User.find().where({email: email});

    if(users.length === 0){
        let encryptedPassword = await bcrypt.hash(password, 12);
        let newUser = new User({
            email: email,
            password: encryptedPassword
        })
        await newUser.save();
        resp.send({message: 'Done'});
    }
    else{
        resp.send({message: 'Rejected'});
    }
})

module.exports = router;
