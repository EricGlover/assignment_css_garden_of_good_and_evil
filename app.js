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
    const view = viewData(cookieObj);

    console.log(view, "what is this");

    res.render("index", {
      cookieObj,
      dislikes: view.dislikes,
      likes: view.likes,
      bio: view.bio,
      resume: view.resume
    });
  } else {
    res.render("index");
  }
});

//cookie information -> sensible data for views
function viewData(cookieObj) {
  let favoriteColor = cookieObj["favorite-color"];
  let favoriteFood = cookieObj["favorite-food"];
  let insanity = cookieObj["insanity"];

  let bio = "";
  let location = "";
  let dreams = "";
  let memories = "";
  let education = "";
  let resume = {
    jobs: []
  };

  let viewData = {
    dislikes: [],
    likes: [favoriteColor, favoriteFood, insanity],
    bio: bio,
    resume: resume
  };

  console.log(cookieObj, "what is this");

  if (cookieObj.morality == "evil") {
    location = "Canada";
    hobbies = "Strollin on the beach";
    //handle dislikes
    viewData.dislikes = ["kittens", "coffee", "hippies"];
    memories = "I remember the good times, killing ants as a child.";
    resume.jobs = ["Kidnapper Extraordinaire"];
    console.log(viewData.dislikes);
  } else if (cookieObj.morality == "good") {
    location = "USA";
    hobbies =
      "Volunteering my time to local charities, re-reading biographies about Ghandi and never throwing kid's icecream cones on the ground. ";
    viewData.dislikes = ["mice????", "rainy days", "hippies"];
    memories = "I remember the good times, watching basebal games.";
    resume.jobs = ["Second grade teacher"];
  }
  if (insanity > 70) {
    hobbies =
      "Driving on the beach - sometimes I bring my couch - , wrestling sharks while scuba diving; and doing bit manipulation in C.";
    education = "I had a very educational year once.";
    memories = "I REMEMBER THE GOOD TIMES!!!!!!!";
    //
    resume.jobs.push("Cleaning my cat bootsie");
    resume.jobs.push("Pope");
  } else if (insanity <= 70) {
    education = "I went to Oxford...no big deal.";
  }

  viewData.bio = `I grew up in ${location} and my favorite color is ${favoriteColor}. My hobbies include ${hobbies}. My fondest childhood memory ${memories}. ${education}`;
  return viewData;
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
