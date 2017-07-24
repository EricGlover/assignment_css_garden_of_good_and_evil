module.exports = {
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
  }
};
