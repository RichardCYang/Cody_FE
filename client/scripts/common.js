
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

function toggleOnlyLoggedElement(){
    var elements = document.getElementsByClassName('showonlylogged');
    for(var i = 0; i < elements.length; i++){
        if( !sessionStorage.session_id ){
            /* 세션 정보가 없으면 로그인 전용 요소들을 숨김 */
            elements[i].style.display = 'none';
        }
    }
}

addEventListener('load',function(event){
    toggleOnlyLoggedElement();
});