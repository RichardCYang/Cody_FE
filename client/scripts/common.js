
function setClassName( target,classname ){
    target.setAttribute('class',classname);
}

function setChangeSubClassName( target,classname ){
    var child = target.children;
    for(var i = 0; i < child.length; i++){
        setClassName(child[i],classname);
    }
}

function appendDOM( parent,tag,classname,event ){
    var dom = document.createElement(tag);
    classname ? dom.setAttribute('class',classname) : null;
    event ? dom.addEventListener(event.type,event.callback) : null;
    parent.appendChild(dom);
    return dom;
}

function includeHTML( parent,path ){
    var xhr = new XMLHttpRequest;
    xhr.open('GET',path,false);
    xhr.send();

    var dom = new DOMParser().parseFromString(xhr.responseText,'text/html');
    dom = dom.body.children[0];
    parent.insertBefore(dom,parent.children[0]);
}

window.addEventListener('load',function(event){
    includeHTML(document.body,'./com/menu.html');
    includeHTML(document.body,'./com/header.html');
});