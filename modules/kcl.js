
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
    if( str.startsWith("'") || str.startsWith('"') ){
        str = str.substring(1);
    }
    if( str.endsWith("'") || str.endsWith('"') ){
        str = str.substring(0,str.length - 1);
    }
    return str;
}
const codeparser = (parseToken,callback) => {
    if( parseToken ){
        parseToken = parseToken.filter(token => token.trim().length != 0);
        for(let j = 0; j < parseToken.length; j++){
            let token = parseToken[j].split(',');
            if( token ){
                if( callback ){
                    callback(token);
                }
            }
        }
    }
}
const interpret = (lines) => {
    /* 변수 선언부 및 함수 호출부 파싱 */
    for(let i = 0; i < lines.length; i++){
        let varDecExp = new RegExp(/@선언\((.*?)\)/);
        let funcCallExp = new RegExp(/@호출\((.*?)\)/);
        /* 변수 선언부 파싱 */
        if( varDecExp.test(lines[i]) ){
            let parseToken = lines[i].split(varDecExp);
            codeparser(parseToken,(token) => {
                if( token.length > 1 ){
                    vars[ stripQuotation(token[0] ) ] = token[1];
                }
            });
        }
        /* 함수 호출부 파싱 */
        if( funcCallExp.test(lines[i]) ){
            let parseToken = lines[i].split(funcCallExp);
            codeparser(parseToken,(token) => {
                if( token.length > 0 ){
                    let func = embededFunctions[ stripQuotation(token[0]) ];
                    if( func ){
                        func(token);
                    }
                }
            });
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