const request=require("request");

function getRequest(url,options={}) {
	return new Promise((resolve, reject) => {
		request({
			method:"get",
			url,
			headers:options
		}, (e, r, b) => {
			resolve(b);
		});
	})
}

function postRequest(url, data) {
	return new Promise((resolve, reject) => {
		request.get({
			url,
		});
	}, (e, r, b) => {
		resolve(b);
	})
}

module.exports = {
	getRequest,
	postRequest
}