
window.createCustomPopup = function(){
    var _popup = document.createElement('popup');
    _popup.parent = document.body;
    _popup.loc_x = 0;
    _popup.loc_y = 0;
    _popup.wide = 480;
    _popup.tall = 360;
    _popup.isCenter = false;
    _popup.isEnableBackdrop = false;
    _popup.style.backgroundColor = 'white';
    _popup.style.border = '1px solid rgb(205 205 205)';
    _popup.style.borderRadius = '2px';
    _popup.setBackdropEnabled = function( enabled ){
        this.isEnableBackdrop = enabled;
    }
    _popup.center = function(){
        this.isCenter = true;
    }
    _popup.setY = function( yloc ){
        this.loc_y = yloc;
    }
    _popup.setX = function( xloc ){
        this.loc_x = xloc;
    }
    _popup.setHeight = function( height ){
        this.tall = height;
    }
    _popup.setWidth = function( width ){
        this.wide = width;
    }
    _popup.setParent = function( parent ){
        if( !parent ){
            return;
        }
        this.parent = parent;
    }
    _popup.setBackgroundColor = function( r,g,b ){
        this.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    }
    _popup.addButton = function( attrib ){
        if( !attrib ){
            attrib = [];
        }

        var button = document.createElement('button');
        button.style.position = 'absolute';

        if( !attrib.posX ){ attrib.posX = 0; }
        if( !attrib.posY ){ attrib.posY = 0; }
        if( !attrib.text ){ attrib.text = "Button" }

        button.style.left = attrib.posX + 'px';
        button.style.top = attrib.posY + 'px';
        button.textContent = attrib.text;

        if( attrib.onClick ){
            button.onclick = attrib.onClick;
        }

        this.appendChild( button );
    }
    _popup.show = function(){
        if( this.isEnableBackdrop ){
            var backdrop = document.createElement('div');
            backdrop.style.position = 'fixed';
            backdrop.style.left = '0px';
            backdrop.style.top = '0px';
            backdrop.style.width = '100%';
            backdrop.style.height = '100%';
            backdrop.style.background = 'rgb(42,42,42)';
            backdrop.style.opacity = '0.6';
            backdrop.style.zIndex = '64';

            if( this.parent ){
                this.parent.appendChild( backdrop );
            }
        }

        this.style.position = 'fixed';
        
        if( this.isCenter ){
            /* 자동으로 가운데 맞춤 */
            this.style.left = 'calc(50% - ' + (this.wide / 2) + 'px)';
            this.style.top = 'calc(50% - ' + (this.tall / 2) + 'px)';
        }else{
            /* 직접 위치 지정 */
            this.style.left = this.loc_x + 'px';
            this.style.top = this.loc_y + 'px';
        }
        
        this.style.width = this.wide + 'px';
        this.style.height = this.tall + 'px';
        this.style.zIndex = '128';
        
        if( this.parent ){
            this.parent.appendChild( this );
        }
    }
    return _popup;
}