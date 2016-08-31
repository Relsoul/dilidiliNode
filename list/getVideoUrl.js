"use strict";

const cheerio = require("cheerio");
const request = require("request");
const rq = require("../lib/requestPromise");

function getVideoValue(string, valueName) {
    //正则获取属性
    // 恕我直言..三天后我绝对看不懂这条正则
    let _pattern = new RegExp(`(?:${valueName}=(\"|\')*)([^\+\n\r\;\"\']+)(?:(\"|\')*)`);
    //匹配属性
    let _s = string.match(_pattern);
    //console.log(17,_s);
    _s.length > 0 ? _s = _s[2] : _s = false;
    return _s;
}


module.exports=function (videoUrl) {
    let notVideo="";
    return new Promise((resolve,reject)=>{
        rq.getRequest(videoUrl).then((data) => {
            let $ = cheerio.load(data, {decodeEntities: false});
            console.log(24,data);
            //获取到正确的视频中间件url
            let realUrl = $("#vedio iframe").attr("src");
            notVideo=realUrl.match(/(?:vid=)(.+)(?:&)/)[1];

            //console.log(28,data);
            //console.log(realUrl);
            //通过中间件获取到真正的视频网页
            return rq.getRequest(realUrl, {"Referer": videoUrl})
        })
            .then((data)=> {
                //从真正视频网页获取地址
                let vid = getVideoValue(data, "vid");
                let hd2 = getVideoValue(data, "hd2");
                let typ = getVideoValue(data, "typ");
                let sign = getVideoValue(data, "sign");
                let ulk = getVideoValue(data, "ulk");
                let tmsign = getVideoValue(data, "tmsign");
                //console.log(vid,hd2,typ,sign,ulk,tmsign);

                return rq.getRequest(`https://player.005.tv:60000/parse.php?h5url=null&type=${typ}&vid=${vid}&hd=${hd2}&sign=${sign}&tmsign=${tmsign}&ajax=1&userlink=${ulk}`, {
                    "Referer": `https://player.005.tv:60000/?vid=${vid}&v=${typ}&sign=${sign}`
                })
            })
            .then((data)=> {
                //进行页面判断 如果视频不存在或者已经被删除 返回源地址
                if(!!~data.indexOf("404.mp4")){
                    reject(notVideo)
                }
                resolve(data)
            })
    })
}