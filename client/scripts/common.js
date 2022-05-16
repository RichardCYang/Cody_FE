
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
    event ? parent.addEventListener(event.type,event.callback) : null;
    parent.appendChild(dom);
    return dom;
}

function searchTag( parent,tagname ){
    var tags = parent.getElementsByTagName('*');
    var matchTags = [];
    for(var i = 0; i < tags.length; i++){
        if( tags[i].tagName.toUpperCase().indexOf(tagname.toUpperCase()) > -1 ){
            matchTags.push(tags[i]);
        }
    }
    return matchTags;
}

function includeHTML( parent,path ){
    var xhr = new XMLHttpRequest;
    xhr.open('GET',path,false);
    xhr.send();

    /* 임시 가상DOM 생성 */
    var virtualDOM = document.createElement('div');
    virtualDOM.innerHTML = xhr.responseText;

    var module = searchTag(virtualDOM,'module')[0];
    if( module ){
        parent.insertBefore(module,parent.children[0]);
    }
}

addEventListener('load',function(event){
    includeHTML(document.body,'./com/menu.html');
    includeHTML(document.body,'./com/header.html');
});