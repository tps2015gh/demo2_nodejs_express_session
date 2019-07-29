/**
 * @author Thitipong Samranvanich  
 * @copyright    MIT 
 * @since   2019-07-20 
 * @language  Node.js , Express
 */


// REF - http://www.siamhtml.com/restful-api-with-node-js-and-express/
// REF -  https://www.ninenik.com/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%87%E0%B8%B2%E0%B8%99_Template_Engine_%E0%B9%83%E0%B8%99_Express_%E0%B9%80%E0%B8%9A%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%95%E0%B9%89%E0%B8%99-911.html 
// REF - https://ejs.co/#install
// REF - https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html

/* โหลด Express มาใช้งาน */
const  express = require('express')
var app = express();
const ejs = require('ejs') 
const  path = require('path')
const axios = require('axios'); 
let data = require('./data')

// use session  
var cookieParser = require('cookie-parser');
var session = require('express-session')

app.data = data 


/* ใช้ port 3000 หรือจะส่งเข้ามาตอนรัน app ก็ได้ */
var port = process.env.PORT || 3001 ;

//app.set('views', './views')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))


// use session 

function session_set_options(){
  app.use(cookieParser());
  // smallest  
  session_options = {secret: "Shh, its a secret!"}
  // additional , require for current version 
  // https://github.com/expressjs/session/issues/56
  // https://github.com/expressjs/session#options
  session_options.resave =  true
  session_options.saveUninitialized=  true
  session_options.name  = "cookie_name"
  app.use(session(session_options));
} 
session_set_options();

app.use(cookieParser());
// smallest  
session_options = {secret: "Shh, its a secret!"}
// additional , require for current version 
// https://github.com/expressjs/session/issues/56
// https://github.com/expressjs/session#options
session_options.resave =  true
session_options.saveUninitialized=  true
session_options.name  = "cookie_name"
app.use(session(session_options));

/* สั่งให้ server ทำการรัน Web Server ด้วย port ที่เรากำหนด */
function listen(){
    app.listen(port, function() {
        console.log('Starting node.js on port ' + port);
    });    
}

// use in controller 
// https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client 
// https://github.com/expressjs/session/issues/56
// https://www.tutorialspoint.com/expressjs/expressjs_sessions
// https://stackoverflow.com/questions/5573256/how-to-end-a-session-in-expressjs
app.inc_page_views = function(req,res){
  if(req.session.page_views){
    req.session.page_views++;
    console.log("You visited this page " + req.session.page_views + " times");
  } else {
    req.session.page_views = 1;
    console.log("Welcome to this page for the first time!");
  }
}


exports.app = app 
exports.listen = listen 
exports.axios  = axios 
exports.session = session 


 
