/**
 * @author Thitipong Samranvanich  
 * @copyright    MIT 
 * @since   2019-07-20 
 * @language  Node.js , Express
 */

var global = require("../global.js")
var app = global.app 
var axios = global.axios
//var listen = global.listen


/* Routing */
app.get('/', function (req, res) {
    //  res.send('<h1>Hello Node.js</h1>');  
    app.inc_page_views(req,res)
    console.log(req.session)

    // get IP Address
    var os = require( 'os' );
    var networkInterfaces = os.networkInterfaces( );
    var arr_netif = networkInterfaces ;
    console.log(arr_netif)

    var params =     {arr_netif: arr_netif,session:req.session}
    res.render('./ctrl1/_',params)

    //res.send("TEST 123");
});
app.get('/index', function (req, res) {
    res.render('./ctrl1/index',{})
});

app.get("/logon", (req, res) => {
  app.inc_page_views(req,res)
  console.log("Session Check!");
  req.session.user_name = "user100";
  console.log(req.session.mySession);
  res.set('Content-Type', 'text/html')

  const fs = require('fs');
  //res.write("header<HR>");
  const html = fs.readFileSync( __dirname + '\\..\\views\\header.html' );
  res.write(html.toString());
 
  res.write("<br>SET  user name logon = " + req.session.user_name  +  " ")

  res.write("<BR>page_views = " + req.session.page_views  +  " ")
  res.write("<br><br><a href='/'>back to home </a>")
  
  res.end() 
   
});


// https://stackoverflow.com/questions/19035373/how-do-i-redirect-in-expressjs-while-passing-some-context
app.get("/logoff", (req, res) => {
   req.session.destroy();
   res.redirect("/" );
});
