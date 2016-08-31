/**
 * Created by liyulun on 16/8/23.
 */

'use strict';
const cheerio = require("cheerio");
const request = require("request");
const rq = require("../lib/requestPromise");


class List{
    constructor($){
        this.$=$;
    }
    strfy(text){
        return text.replace(/[\r\n\t]/g,"")
    }
    getListTitle(){
        let title=this.$(".details-hd dt h1").strfy();
        this.title=title;
    }
    getListDetail(){
        let newPart=this.$(".details-hd dl dd ").eq(0).find("p").strfy();
        let $otherInfo=this.$(".details-hd dl dd").find("p");
        let area=$otherInfo.eq(1).strfy();
        let year=$otherInfo.eq(2).strfy();
        //暂时不获取playerCount 因为要发起新的请求 要处理异步
        //let playerCount=$otherInfo.eq(3).strfy();
        let tag=$otherInfo.eq(4).strfy();
        let downText=$otherInfo.eq(5).strfy();
        let downHref=$otherInfo.eq(5).find("a").attr("href");
        let info=$otherInfo.eq(7).strfy();
        let videoDetail=this.$(".details-about").strfy().replace(/\[展开全部\]|\[显示部分\]/gi,"");
        let poster=this.$(".details-hd .img img").attr("src");
        let _obj={
            newPart,
            area,
            year,
            tag,
            downText,
            downHref,
            info,
            videoDetail,
            poster
        };
        this.detail=_obj;
    }
    getList(){
        let _arr=[];

        let $listWrap=this.$(".episodeWrap").find("li");
        $listWrap.each((i,e)=>{
            let _obj={};
            let $listWrapHref=this.$(e).find("a");
            if(this.$(e).hasClass("more")){
                return false;
            }
            _obj["number"]=$listWrapHref.strfy();
            _obj["href"]=$listWrapHref.attr("href");
            _arr.push(_obj);
        });

        this.list=_arr;
    }
    getData(){

        this.getList();
        this.getListDetail();
        this.getListTitle();

        return{
            list:this.list,
            detail:this.detail,
            title:this.title
        }
    }
}


module.exports=function (url) {
    return new Promise((resolve,reject)=>{
        rq.getRequest(url)
            .then((data)=>{
                let $=cheerio.load(data, {decodeEntities: false});
                //添加新api 去除\r\n\t
                $.prototype.strfy=function () {
                    let old=this.text();
                    return old.replace(/[\r\n\t]/g,"").trim()
                };

                let d=new List($);
                let allData=d.getData();
                resolve(allData);
            })
            .catch((d)=>{
                reject(d)
            })
    })
};