
function initBannerImgs(){
    var banner = document.querySelector('.slidercontent');
    var bannerIndex = document.querySelector('.contentIndexes');
    var bannerItem;
    banner.children[0].src = window.imgs[0];

    for(var i = 0; i < window.imgs.length; i++){
        bannerItem = appendDOM(bannerIndex,'div','normalIndex',{'type':'click','callback':function(event){
            setChangeSubClassName(bannerIndex,'normalIndex');
            event.target.setAttribute('class','activeIndex');
            banner.children[0].src = window.imgs[event.target.idx];
        }});
        bannerItem.idx = i;
    }
}

window.onload = function(){
    window.imgs = [
        "./imgs/banner1.jpg",
        "./imgs/banner2.jpg",
        "./imgs/banner3.jpg"
    ];
    initBannerImgs();
}