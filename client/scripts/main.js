
function scrollBanner( scrollamount ){
    var banner = querySelectorCompatible('.banneritems');
    var target = scrollamount * -1280;
    var animTimer = setInterval(function(){
        banner.style.left = (banner.offsetLeft + (banner.offsetLeft >= (scrollamount * -1280) ? -80 : 80)) + 'px';
        if( banner.offsetLeft == target ){
            clearInterval(animTimer);
        }
    },15);
}

function initBannerImgs(){
    var banner = querySelectorCompatible('.banneritems');
    var bannerIndex = querySelectorCompatible('.contentIndexes');
    var bannerItem,bannerImg;

    for(var i = 0; i < window.imgs.length; i++){
        bannerImg = appendDOM(banner,'img');
        bannerItem = appendDOM(bannerIndex,'div','normalIndex',{'type':'click','callback':function(event){
            setChangeSubClassName(bannerIndex,'normalIndex');

            event.target = event.target ? event.target : event.srcElement;
            event.target.setAttribute('class','activeIndex');
            /* For IE5-9 */
            event.target.className = 'activeIndex';

            scrollBanner(event.target.idx);
        }});
        bannerItem.idx = i;
        bannerImg.src = window.imgs[i];
        bannerImg.style.left = (i * 1280) + 'px';
    }
}

function onMenuButton_hovered(target){
    target.style.background = '#75b1ff';
}

function onMenuButton_unhovered(target){
    target.style.background = 'none';
}

window.onload = function(){
    /* 여기에 사용할 배너 이미지 경로들을 추가하시면 됩니다. */
    window.imgs = [
        "./imgs/banner1.jpg",
        "./imgs/banner2.jpg",
        "./imgs/banner3.jpg"
    ];
    initBannerImgs();
}