const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
    
    async function f(url){
        let data = await fetch(url).then(resp => {resp.json()});
        return data
    }
    
    //const libSearchUrl = 'https://api.calil.jp/library?appkey=beb8cae3fc718d98f48917a6928a8373&pref=大分県';
    const libSearchUrl = 'https://api.calil.jp/library?appkey=beb8cae3fc718d98f48917a6928a8373&format=json&pref=%E5%A4%A7%E5%88%86%E7%9C%8C'
    //openDbに本の情報を問い合わせる。
    //とってきた情報をstateに保存
    let resp = f(libSearchUrl)
    response.send(resp)
    
});