const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
    //const libSearchUrl = 'https://api.calil.jp/library?appkey=beb8cae3fc718d98f48917a6928a8373&pref=大分県';
    const libSearchUrl = 'https://api.openbd.jp/v1/get?isbn=9784873115658'
    //openDbに本の情報を問い合わせる。
    //とってきた情報をstateに保存
    resp = fetch(libSearchUrl)
    response.send(resp)
    
   });