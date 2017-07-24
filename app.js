const express = require("Express");
const app = express();
const hbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const port = 3000;

// cookies
app.use(cookieParser());

//set up handlebars
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//run that surver
app.get("/", (req, res) => {
  res.render("index", {});
});

app.post("/", (req, res) => {
	// const id = req.params.id;
  const favorites = req.cookies.favorites || [];
  res.cookie("favorites", favorites.push(id));
  res.redirect("/");
})

app.listen(port, (err, data) => {
  console.log(`server listening on localhost:${port}`);
});
