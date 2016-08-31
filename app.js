const express=require("express");
const cheerio=require("cheerio");
const request=require("request");
const routeList=require("./routeList");

const app=express();

var server = app.listen(3004, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});




routeList(app);

