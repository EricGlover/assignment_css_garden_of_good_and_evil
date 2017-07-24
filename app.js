const express = require("Express");
const app = express();
const hbs = require("express-handlebars");
const body_parser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const port = 3000;
const path = require("path");

// cookies
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

//set up handlebars
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//run that surver
app.get("/", (req, res) => {
  console.log(req.session.visited);
  if (req.session.visited) {
    console.log("hello again");
  } else {
    req.session.visited = true;
  }
  const morality = req.cookies.e_g.morality;
  //console.log(req.cookies);
  res.render("index", { morality });
});

app.post("/", (req, res) => {
  // const id = req.params.id;

  console.log(req.cookies.e_g);
  const cookie_obj = {
    morality: req.body.morality
  };
  //const evil_or_good = req.cookies.e_g || {};
  res.cookie("e_g", cookie_obj);
  //const favorites = req.cookies.favorites || [];
  //res.cookie("favorites", favorites.push(id));

  res.redirect("/");
});

app.listen(port, (err, data) => {
  console.log(`server listening on localhost:${port}`);
});
