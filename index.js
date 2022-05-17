
const http = require('http');
const fs   = require('fs');

/* URL로부터 MIME 타입을 가져오는 함수 */
const getMIME = (url) => {
    if( url.indexOf('.html') > -1 ){
        return 'text/html';
    }
    if( url.indexOf('.css') > -1 ){
        return 'text/css';
    }
    if( url.indexOf('.ttf') > -1 ){
        return 'application/x-font-ttf';
    }
    if( url.indexOf('.htc') > -1 ){
        return 'text/x-component';
    }
    return 'text/text';
}
/* URI로부터 실제 URL을 가져오는 함수 */
const getUrlFromUri = (uri) => {
    let prefix = './client';
    uri === '/' ? uri = '/index.html' : uri;
    return prefix + uri;
}
/* 자원요청 처리 */
const loadResource = (uri) => {
    let url = getUrlFromUri(uri);
    let data = fs.readFileSync(decodeURIComponent(url));
    return data;
}
/* 테스트용 웹 서버 생성 */
http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type':getMIME(getUrlFromUri(req.url))});
    try{
        let data = loadResource(req.url);
        res.end(data);
    }catch(err){
        console.log(err);
    }
    res.end();
}).listen(8090);