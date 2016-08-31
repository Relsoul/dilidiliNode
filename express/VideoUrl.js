/**
 * Created by liyulun on 16/8/23.
 */
"use strict";

let getVideoUrl = require("../list/getVideoUrl");

module.exports = function (req, res) {
    var url=req.params[0].replace(/http:\/\/m.dilidili.com\/|http:\/\/dilidili.com\/|http:\/\/www.dilidili.com\//gi,"");

    let c = "http://m.dilidili.com/" + url;
    console.log("url", c);
    getVideoUrl(c)
        .then(
            (data)=> {
                res.send({"playUrl": data})
            })
        .catch(
            (error)=>{
                res.send(error)
        })
}