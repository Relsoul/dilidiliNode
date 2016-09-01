'use strict';
const request=require("request");

function getRequest(url,options) {
	options=options||{};
	return new Promise((resolve, reject) => {
		request({
			method:"get",
			url,
			headers:options
		}, (e, r, b) => {
			console.log("访问url:",url,'访问附加参数:',options);
			if(!b||(r.statusCode&&r.statusCode==404)){
				console.log('返回代码:',r.statusCode)
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