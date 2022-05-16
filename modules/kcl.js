
let src = '';
const vars = [];
const embededFunctions = [];
embededFunctions['출력'] = (args) => {
    let msg = '';
    if( args.length == 0 ){
        return;
    }
    for(let i = 1; i < args.length; i++){
        msg = msg + stripQuotation(args[i]);
    }
    console.log(msg);
}

const stripQuotation = (str) => {
    if( str.startsWith('"') || str.startsWith("'") ){
        str = str.substring(1);
    }
    if( str.endsWith('"') || str.endsWith("'") ){
        str = str.substring(0,str.length - 1);
    }
    return str;
}
const parseStatement = (state) => {
    let status = false;
    let data = '';
    for(let i = 0; i < state.length; i++){
        if( state.charAt(i) === '(' ){
            if(!status){
                status = true;
            }
        }
        if( status ){
            data = data + state.charAt(i);
        }
        if( state.charAt(i) === ')' ){
            if(status){
                if( i == state.length - 1 ){
                    status = false;
                }
            }
        }
    }
    data = data.substring(1,data.length - 2);
    return data.split(',');
}
const interpret = (lines) => {
    /* 변수 선언부 및 함수 호출부 파싱 */
    for(let i = 0; i < lines.length; i++){
        let varDecExp = new RegExp(/@선언\((.*?)\)/);
        let funcCallExp = new RegExp(/@호출\((.*?)\)/);
        /* 변수 선언부 파싱 */
        if( varDecExp.test(lines[i]) ){
            let parseToken = parseStatement(lines[i]);
            if( parseToken.length > 1 ){
                vars[ stripQuotation(parseToken[0]) ] = parseToken[1];
            }
        }
        /* 함수 호출부 파싱 */
        if( funcCallExp.test(lines[i]) ){
            let parseToken = parseStatement(lines[i]);
            parseToken = parseToken.map(data => new RegExp(/@참조\('(.*?)'\)/).test(data) ? vars[ data.split(/@참조\('(.*?)'\)/)[1] ] : data);
            if( parseToken.length > 0 ){
                let func = embededFunctions[ stripQuotation(parseToken[0]) ];
                if( func ){
                    func(parseToken);
                }
            }
        }
    }
}

exports.parse = (data) => {
    src = data;
}

exports.executeHook = (hookname) => {
    if( src == undefined ){
        return;
    }
    /* 파싱 */
    let parseData = src.split(/@수신\s+"(.*?)"/gi);
    parseData.forEach((chunk,idx) => {
        if( idx % 2 == 1 ){
            if( chunk !== hookname ){
                return;
            }
            if( parseData[idx + 1] ){
                    /* 주석 삭제 작업( 주석 무시 ) */
                    let contentLines = parseData[idx + 1].split('\n').filter(line => !line.trim().startsWith('#'));
                    interpret(contentLines);
            }
        }
    })
}