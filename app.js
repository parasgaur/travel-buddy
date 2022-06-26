let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer'); //to handle binary data
let cookieParser = require('cookie-parser');
let postsRouter = require('./routes/posts.route');
let callbackRequestsRouter = require('./routes/callback-requests.route');
let emailRouter = require('./routes/emails.route');
let usersRouter = require('./routes/users.route');
const e = require('express');
let Post = require('./models/post.model').Post;
let auth = require('./controllers/auth');

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/travels', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.json());

let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname) 
});
app.use(multer({storage:imageStorage}).single('imageFile')); //for binary data i.e. image file


//for all the client side files that are stored in public folder
//we inform the server that root folder of the client side files is public
app.use(express.static('public'));
app.use(cookieParser());
app.use('/posts', postsRouter);
//when the request is made on the route path which starts with /callback-requests, it'll be redirected to callback-requests.route.js file
app.use('/callback-requests', callbackRequestsRouter);

app.use('/emails', emailRouter);

app.use('/users', usersRouter);

app.get('/landmark', async (req, resp) => {
    let id = req.query.id;
    let post = await Post.findOne({id: id});
    resp.render('landmark', {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        text: post.text
    })
})


app.get('/admin', (req,resp) => {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)){
        resp.render('admin');
    }
    else{
        resp.redirect('/login');
    }
})

app.get('/login', (req,resp) => {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)){
        resp.redirect('/admin');
    }
    else{
        resp.render('login');
    }
})

app.listen(3000, ()=>{
    console.log("Connected to 3000...");
});