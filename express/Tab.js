/**
 * Created by liyulun on 16/8/21.
 */
"use strict";

let getTabLib=require("../list/getTab");

function getTab(req,res){
    getTabLib().then((data)=>{
        res.send(data);
    }).catch((error)=>{ res.send(error);})
};

module.exports=getTab;