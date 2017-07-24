const express = require("express");
const hbs = require("express-handlebars");
const body_parser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");

const utils = require("./utils");

// init express
const app = express();
const port = 3000;

// init handlebars
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// middleware
app.use(cookieParser());

app.use(
  session({
    secret: "123456969",
    resave: false,
    saveUninitialized: true
  })
);

app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// paths
app.get("/", (req, res) => {
  let cookieObj = null;

  if (req.cookies.e_g) {
    cookieObj = req.cookies.e_g;
    console.log(cookieObj);
    //make objects to pass to views

    //res.render("index", { cookieObj });
    const view_data = viewData(cookieObj);
    res.render('index', {cookieObj,  {dislikes: view_data.dislikes} } )
  } else {
    res.render("index");
  }
});

//cookie information -> sensible data for views
function viewData(cookieObj) {
  const view_data = {
    dislikes: []
  };
  if (cookieObj.morality == "evil") {
    //handle dislikes
    view_data.dislikes = ['kittens', 'coffee', 'hippies']
  } else if (cookieObj.morality == "good") {
    view_data.dislikes = ['mice????', 'rainy days', 'hippies']
  }
  return view_data;
}

app.post("/", (req, res) => {
  let cookieObj = utils.cookieTools.customizeCookie(req.body);

  // const cookie_obj = {
  //   morality: {
  //   	color: req.body.morality
  //   }
  // };

  res.cookie("e_g", cookieObj);
  res.redirect("/");
});

app.listen(port, (err, data) => {
  console.log(`server listening on localhost:${port}`);
});
