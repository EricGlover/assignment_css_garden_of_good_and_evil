module.exports = {
	generateCookie: (requestBody) => {
		console.log(requestBody);
		let cookie = {};


		for (item in requestBody) {
			if (requestBody[item] === 'evil') {
				cookie.alignment = 'evil';
				cookie.font = 'evil-font';
				cookie.text = 'muahahaha';
			} else if (requestBody[item] === 'good') {
				cookie.alignment = 'good';
				cookie.font = 'good-font';
				cookie.text = 'im good';
			}
		}

		return cookie;
	}
}