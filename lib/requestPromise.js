'use strict';
const request=require("request");

function getRequest(url,options) {
	options=options||{};
	console.log('options',options);
	return new Promise((resolve, reject) => {
		request({
			method:"get",
			url,
			headers:options
		}, (e, r, b) => {
			if(!b||r.statusCode!=200){
				return reject({error:"不存在网页数据"})
			}
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