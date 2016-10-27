//main variables
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080; // default port 8080
const cookieParser = require('cookie-parser');

//functions
function generateRandomString() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 5; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}


app.set("view engine", "ejs");

//middleware how to get object body and cookies
app.use(cookieParser()); // puts parsed cookes in req.cookies

const bodyParser = require("body-parser"); //puts parsed body in req.body
app.use(bodyParser.urlencoded({
  extended: true
}));

let urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//routes
app.get("/", (req, res) => {
  let templateVars = {
    username: req.cookies["username"]
  }
  res.end("Get Shorty Homepage", templateVars);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});


app.get("/urls", (req, res) => {
  let templateVars = {
    urls: urlDatabase,
    username: req.cookies["username"]
    };
  res.render("urls_index", templateVars);

});

app.get("/urls/new", (req, res) => {
  let templateVars = {
    username: req.cookies["username"]
    };
  res.render("urls_new", templateVars);
});

app.get("/urls/:id", (req, res) => {
  let templateVars = {
    username: req.cookies["username"],
    shortURL: req.params.id };
  res.render("urls_view", templateVars);

});

app.post("/urls", (req, res) => {
 urlDatabase[generateRandomString()] = req.body.longURL
 res.redirect("/urls");
})

app.post('/:id/delete', (req,res) => {
delete urlDatabase[req.params.id];2
res.redirect("/urls");
})

app.post('/:id/update', (req,res) => {
urlDatabase[req.params.id]= req.body.newlongURL;
res.redirect("/urls");
})

app.post('/login', (req,res) =>{
  res.cookie("username", req.body.username);
  res.redirect('/');
})

// app.get('/cookietester',(req,res)=>{
//   console.log("username", req.cookies);
//   res.redirect('/');
// })
app.listen(PORT, () => {
 console.log(`Example app listening on port ${PORT}!`);
});