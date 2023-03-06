const express=require('express');
const app=express();
const port=9000;
const EJSLayout=require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookie= require('cookie-parser');
const User= require('./models/user');
const session=require('express-session');
const passport=require('passport');
const passportLocal = require('./config/passport-local-streegy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const MongoStore=require('connect-mongo')(session);
const flash=require('connect-flash');
const customMware=require('./config/middleware');
const { create } = require('./models/user');

// setup the chat server to be used with socket.io
const chatServer = require('http').createServer(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');



// I used this when i use (req.body.password) and i find TypeError 
app.use(express.urlencoded());

// Set extrnal css in ejs
app.use(express.static('./assets'));
app.use(express.static('./faviconicon'));
app.use('/uploads',express.static(__dirname + '/uploads'))

app.use(cookie());
app.use(EJSLayout);
// Set EJS view engine and path
app.set('view engine', 'ejs');
app.set('views', './views');

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Make Session authenticate
app.use(session({
    name:"Alston",
    secret:'sidhualston',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    }
    ,store:new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    
    (err=>{
        console.log(err || "connect mongodb setup ok")
    })
    )
}))
app.use(passport.initialize());
   app.use(passport.session());

   app.use(passport.setAuthenticatedUser)

   app.use(flash());
   app.use(customMware.setFlash);
// Set route 
app.use('/',require('./routes/web'));

app.listen(port,(err)=>{
    if(err){console.log('Error in server run:',err);return}
    console.log("Server run sucessfull for port ",port)
})