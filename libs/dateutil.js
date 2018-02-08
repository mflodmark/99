
require("./stringutil");

exports.niceDate = function() {
	let date = new Date();
	return `${date.getFullYear().pad(4)}-${date.getMonth().pad(2)}-${date.getDate().pad(2)}`;
};
