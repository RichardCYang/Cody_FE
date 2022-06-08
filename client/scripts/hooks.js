
function clearContent(){
    var content = document.querySelector('main');
    if( content ){
        document.body.removeChild( content );
    }
}
function hook_clicked( data ){
    if( data == 'HOOK_CLICKED_FINDID' ){
        if( window.createCustomPopup ){
            var popup = window.createCustomPopup();
            popup.setBackdropEnabled(true);
            popup.setWidth(240);
            popup.setHeight(120);
            popup.center();
            popup.addSystemButtons();
            popup.show();
        }
        return;
    }

    if( data == 'HOOK_CLICKED_USERMENU' ){
        this.isClicked = !this.isClicked;
        var usermenu = document.querySelector('.usermenu');
        if( usermenu ){
            if( usermenu.children.length > 0 ){
                if( this.isClicked ){
                    usermenu.children[0].style.display = 'block';
                }else{
                    usermenu.children[0].style.display = 'none';
                }
            }
        }
        return;
    }

    if( data == 'HOOK_CLICKED_BOARD' ){
        clearContent();
        window.loadPage('body','./frags/board.frg');
        return;
    }

    if( data == 'HOOK_CLICKED_GOHOME' ){
        clearContent();
        window.loadPage('body','./frags/index.frg');
        if( init_main ){
            init_main();
        }
        return;
    }

    if( data == 'HOOK_CLICKED_SIGNIN' ){
        clearContent();
        window.loadPage('body','./frags/login.frg');
        return;
    }

    if( data == 'HOOK_CLICKED_SIGNUP' ){
        clearContent();
        window.loadPage('body','./frags/register.frg');
        return;
    }
}