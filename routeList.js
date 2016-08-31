/**
 * Created by soul on 16/8/21.
 */

"use strict";

const getTab=require("./express/Tab");
const getVideoUrl=require("./express/VideoUrl");
const getList=require("./express/List");



module.exports=function(app){

    //跨域
    app.use(function(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });

    app.get("/getTab",getTab);
    app.get("/video/*",getVideoUrl);
    app.get("/list/*",getList);
};


