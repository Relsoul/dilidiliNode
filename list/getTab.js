"use strict";
const cheerio = require("cheerio");
const request = require("request");
const rq = require("../lib/requestPromise");


class getWeekList{
    constructor($,week){
        this.$=$;
        this.allData=[];

        //初始化数组
        this.week=week;
        if(typeof week !=="object"){
            this.week=[week];
        }

        for(let i of this.week){
            this.allData.push(this.getWeekList(i));
        }
    }
    getWeekList(week){
        let $=this.$;
        let _obj = {
            week: week.substr(-1),
            part: []
        };

        let divElem=$(week).find(".week_item");

        //获取week下的div
        divElem.each((n,m)=>{
            let liElem=$(m).find("ul>li");
            let _current={};

            //循环div下的li
            liElem.each((i, e) => {
                let $a = $(e).find("a");

                //判断是否有week_item_right
                if ($(e).hasClass("week_item_right")) {
                    _current["animatePart"] = {
                        title: $a.text(),
                        href: $a.attr("href")
                    };
                } else {
                    _current["animateTitle"] = {
                        title: $a.text(),
                        href: $a.attr("href")
                    };
                }
            });

            _obj['part'].push(_current);
        });
        return _obj;
    }
    getData(){
        return this.allData;
    }
}

function getTab(){
    return new Promise((resolve,reject)=>{
        rq.getRequest("http://m.dilidili.com/").then((data) => {
            let $ = cheerio.load(data, {decodeEntities: false});
            let d=new getWeekList($, ["#weekdiv1","#weekdiv2","#weekdiv3","#weekdiv4","#weekdiv5","#weekdiv6","#weekdiv7"]);
            resolve(d.getData());
        }).catch((err)=>{console.error(err)});
    });

}


module.exports=getTab;





