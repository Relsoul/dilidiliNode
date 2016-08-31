/**
 * Created by soul on 16/8/21.
 */

"use strict";

const getTab=require("./express/Tab");
const getVideoUrl=require("./express/VideoUrl");
const getList=require("./express/List");
const domain=require("domain");


module.exports=function(app){

    app.use(function(req,res,next){
        var d=domain.create();
        d.on("error",function(err){
            console.error('An uncaught error occurred!');
            res.send("出错了! by domain");
            //console.error(err.stack);
        });

        d.add(req);
        d.add(res);
        d.run(next);

        process.on('unhandledRejection', function (err) {
            console.log(err.stack);
            res.send({error:"出错了!"});
        });
    });

    //跨域
    app.use(function(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });

    app.get("/getTab",getTab);
    app.get("/video/*",getVideoUrl);
    app.get("/list/*",getList);
};


