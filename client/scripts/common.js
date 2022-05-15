
/* 크로스 플랫폼 클래스 선택자 */
function getElementsByClassNameCompatible( classname ){
    if( document.getElementsByClassName ){
        return document.getElementsByClassName(classname);
    }
    var nodes = document.getElementsByTagName('*');
    var classes = [];
    for(var i = 0; i < nodes.length; i++){
        if( nodes[i].className.indexOf( classname ) > -1 ){
            classes[ classes.length ] = nodes[i];
        }
    }
    return classes;
}
/* 크로스 플랫폼 쿼리 선택자 */
function querySelectorCompatible( name ){
    if( document.querySelector ){
        return document.querySelector(name);
    }
    /* 클래스 선택자 */
    if( name.charAt(0) == '.' ){
        name = name.substring(1);
        return getElementsByClassNameCompatible(name)[0];
    }
    /* 아이디 선택자 */
    if( name.charAt(0) == '#' ){
        name = name.substring(1);
        return document.getElementById(name);
    }
    return null;
}
/* 크로스 플랫폼 이벤트 등록 함수 */
function addEvent( element,event,callback ){
    if(element.addEventListener){
        element.addEventListener(event,callback);
        return;
    }
    if(element.attachEvent){
        element.attachEvent('on' + event,callback);
        return;
    }
    element['on' + event] = callback;
    return;
}

function setClassName( target,classname ){
    target.setAttribute('class',classname);
}

function setChangeSubClassName( target,classname ){
    var child = target.children;
    for(var i = 0; i < child.length; i++){
        setClassName(child[i],classname);
        /* For IE5-9 */
        child[i].className = classname;
    }
}

function appendDOM( parent,tag,classname,event ){
    var dom = document.createElement(tag);
    classname ? dom.setAttribute('class',classname) : null;
    /* For IE5-9 */
    classname ? dom.className = classname : '';
    event ? addEvent(dom,event.type,event.callback) : null;
    parent.appendChild(dom);
    return dom;
}

function includeHTML( parent,path ){
    var xhr = new XMLHttpRequest;
    xhr.open('GET',path,false);
    xhr.send();

    parent.insertAdjacentHTML('afterbegin',xhr.responseText);
}

addEvent(window,'load',function(event){
    includeHTML(document.body,'./com/menu.html');
    includeHTML(document.body,'./com/header.html');
});