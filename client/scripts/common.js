
function includeHTML( parent,path ){
    var xhr = new XMLHttpRequest;
    xhr.open('GET',path);
    xhr.onreadystatechange = function(event){
        if( xhr.readyState === xhr.DONE ){
            var dom = new DOMParser().parseFromString(xhr.responseText,'text/html');
            parent.appendChild(dom.body);
        }
    }
    xhr.send();
}