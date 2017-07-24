module.exports = {
	// TODO: similar functionality - refactor later
  customizeCookie: requestBody => {
    let cookie = {};

    for (item in requestBody) {
      cookie[item] = requestBody[item];
      if (requestBody[item] === "evil") {
        cookie.alignment = "evil";
        cookie.font = "evil-font";
        cookie.text = "muahahaha";
      } else if (requestBody[item] === "good") {
        cookie.alignment = "good";
        cookie.font = "good-font";
        cookie.text = "im good";
      }
    }

    return cookie;
  },

  viewData: cookieObj => {
    let favoriteColor = cookieObj["favorite-color"];
    let favoriteFood = cookieObj["favorite-food"];
    let insanity = cookieObj["insanity"];

    let bio = "";
    let location = "";
    let dreams = "";
    let memories = "";
    let education = "";
    let resume = {
      jobs: [],
      skills: [],
      education: []
    };

    let viewData = {
      dislikes: [],
      likes: [favoriteColor, favoriteFood, insanity],
      bio: bio,
      resume: resume
    };

    if (cookieObj.morality == "evil") {
      location = "Canada";
      hobbies = "Strollin on the beach";
      //handle dislikes
      viewData.dislikes = ["kittens", "coffee", "hippies"];
      memories = "I remember the good times, killing ants as a child.";

      // resume
      resume.jobs = ["Kidnapper Extraordinaire"];
      resume.skills = ["Taking over the world"];
      resume.education = ["The Anarchist's Cookbook"];

    } else if (cookieObj.morality == "good") {
      location = "USA";
      hobbies =
        "Volunteering my time to local charities, re-reading biographies about Ghandi and never throwing kid's icecream cones on the ground. ";
      viewData.dislikes = ["mice????", "rainy days", "hippies"];
      memories = "I remember the good times, watching basebal games.";

      // resume
      resume.jobs = ["Second grade teacher"];
      resume.skills = ["Community service for the elderly"];
      resume.education = ["Oxford"];
    }
    if (insanity > 70) {
      hobbies =
        "Driving on the beach - sometimes I bring my couch - , wrestling sharks while scuba diving; and doing bit manipulation in C.";
      education = "I had a very educational year once.";
      memories = "I REMEMBER THE GOOD TIMES!!!!!!!";
      
      // resume
      resume.jobs.push("Cleaning my cat bootsie");
      resume.jobs.push("Pope");
      resume.skills = ["Taking care of those damn aliens"];
      resume.education = ["Education, All Year."];


    } else if (insanity <= 70) {
      education = "I went to Oxford...no big deal.";
    }

    viewData.bio = `I grew up in ${location} and my favorite color is ${favoriteColor}. My hobbies include ${hobbies}. My fondest childhood memory ${memories}. ${education}`;
    return viewData;
  }
};
