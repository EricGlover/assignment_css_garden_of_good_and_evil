const express = require("Express");
const app = express();
const hbs = require("express-handlebars");
const port = 3000;

//set up handlebars
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//run that surver
app.get("/", (req, res) => {
  res.render("index", {});
});

app.listen(port, (err, data) => {
  console.log(`server listening on localhost:${port}`);
});
