//瀑布流
$( window ).on( "load", function(){
    waterfall('fall','box');
    var dataInt= [
                    { portrait:'images/headportrait2.jpg',username:'沐雨橙风',pic:'img1.jpg',txt:'银鞍照白马，飒沓如流星'},
                    { portrait:'images/headportrait1.jpg',username:'沐雨橙风',pic:'img2.jpg',txt:'银鞍照白马，飒沓如流星'}, 
                    { portrait:'images/headportrait3.jpg',username:'沐雨橙风',pic:'pic1.jpg',txt:'银鞍照白马，飒沓如流星'},  
                    { portrait:'images/headportrait1.jpg',username:'沐雨橙风',pic:'pic3.jpg',txt:'银鞍照白马，飒沓如流星'},  
                    { portrait:'images/headportrait2.jpg',username:'沐雨橙风',pic:'pic4.jpg',txt:'银鞍照白马，飒沓如流星'}
                 ]  
    window.onscroll=function(){
        if(checkscrollside()){
            $.each( dataInt, function( index, value ){
                 
                var $oBox = $('<div>').addClass('box').appendTo( $( '#fall' ) );

                var $boxHeader = $('<div>').addClass('boxheader').appendTo($oBox);
                var $aPortrait = $('<a>').appendTo($boxHeader);
                $('<img>').attr('src','./images/' + $( value).attr( 'pic') ).appendTo($aPortrait);
                $('<a>').html($(value).attr('txt')).appendTo($boxHeader);
                $('<span>').addClass('follow').html('关注').appendTo($boxHeader);

                var $boxImg = $('<div>').addClass('boximg').appendTo($oBox);
                var $oA = $('<a>').appendTo($boxImg);
                var $oImg = $('<img>').attr('src','./images/' + $( value).attr( 'pic') ).appendTo($oA);
                
                $('<div>').addClass('boxtext').html($(value).attr('txt')).appendTo($oBox);

                var $boxInfo = $('<div>').addClass('boxinfo').appendTo($oBox);
                var html = '<i class="icon-heart-empty"></i>24人喜欢';
                $boxInfo.html(html);

            });
            waterfall();
        };
    }
});

function waterfall(parent,box){
    var $aBox = $( '#fall>div');
    var iBoxW = $aBox.eq( 0 ).width();// 一个块框box的宽
    var num = 4;

    var boxHArr=[];//用于存储 每列中的所有块框相加的高度。

    $aBox.each( function( index, value ){
        var boxH = $aBox.eq( index ).height();
        if( index < num ){
            boxHArr[ index ] = boxH; //第一行中的num个块框box 先添加进数组boxHArr
        }else{
            var minH = Math.min.apply( null, boxHArr );//数组boxHArr中的最小值minH
            var minHIndex = $.inArray( minH, boxHArr );
            $( value ).css({
                'position': 'absolute',
                'top': minH + 15,
                'left': $aBox.eq( minHIndex ).position().left
            });
            //数组 最小高元素的高 + 添加上的aBox[i]块框高
            boxHArr[ minHIndex ] += $aBox.eq( index ).height() + 15;//更新添加了块框后的列高
        }
    });
}

function checkscrollside(){
    var $aBox = $( "#fall>div" );
    var lastBoxH = $aBox.last().offset().top + Math.floor($aBox.last().height()/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop = $( window ).scrollTop()//注意解决兼容性
    var documentH = $( document ).height();//页面高度
    return (lastBoxH < scrollTop + documentH ) ? true : false;//到达指定高度后 返回true，触发waterfall()函数
}




//更多的下拉菜单
$('.mainnav .more>a').click(function() {   //显示和隐藏
    $('.morenav').slideToggle('fast');
});

$(window).click(function(event) {        //点击下拉菜单以外区域隐藏
    if (!event.target.matches('.more>a')) {
        $('.morenav').slideUp('fast');
    }
})



//我的订阅下拉菜单
$('#navsearch').focus(function() {   //搜索框获得焦点时显示我的订阅和隐藏new
    $('.my_subscription').slideDown('fast');
    $('.new').fadeOut('fast');
});

$('#navsearch').blur(function() {   //搜索框失去焦点时隐藏我的订阅和显示new
    $('.my_subscription').slideUp('fast');
    $('.new').fadeIn('fast');
});



//喜欢文章和取消喜欢
$('.icon-heart').click(function() {   
    $(this).toggleClass('like');
})

$('.icon-heart').mouseover(function() {   
    $(this).css('color','#E40000');
})

$('.icon-heart').mouseout(function() {   

    $(this).css('color','');
})

$('.icon-heart-empty').click( function() {
    $(this).toggleClass('icon-heart-empty icon-heart');
    $('.icon-heart').css({'fontSize':'20px','color':'#E40000','marginRight':'10px'});
    $('.icon-heart-empty').css('color','');
})


//关注和取消关注
$('#fall .box span').click( function() {
    var html = $(this).html() == '关注' ? '取消关注' : '关注';
    $(this).toggleClass('cancle_follow');
    $(this).html(html);
})


//返回顶部
 $(".icon-up-open").click(function(){
    $("html,body").animate({"scrollTop":0},500);    
 }) 

 $(document).scroll( function() {         //鼠标滚到一定距离后，返回顶部按钮再出现
    if($(document).scrollTop() >= 500) {
        $('.icon-up-open').fadeIn('fast');
    }
    if($(document).scrollTop() < 500) {
        $('.icon-up-open').fadeOut('fast');
    }
 })


//我的ART下拉菜单hover显示
$('#myArt').hover( 
    function () {
        $('.myartnav').slideDown('fast');
    },
    function () {
        $('.myartnav').slideUp('fast');
    }
)



//轮播图
var index = 1;
var len = 3;
var timer;
var interval = 3000;
var carousel = $('#carousel');
var buttons = $('#button span');
var imgs = $('#img');
var prev = $('#prev');
var next = $('#next');

function animate (offset) {
    var left = parseInt(imgs.css('left')) + offset;
    if (offset>0) {
        offset = '+=' + offset;
    }
    else {
        offset = '-=' + Math.abs(offset);
    }
    imgs.animate({'left': offset}, 300, function () {
        if(left > -200){
            imgs.css('left', -1200 * len);
        }
        if(left < (-1200 * len)) {
            imgs.css('left', -1200);
        }
    });
}

function showButton() {
    buttons.eq(index-1).addClass('on').siblings().removeClass('on');
}

function play() {
    timer = setTimeout(function() {
        next.trigger('click');
        play();
    },interval);
}

function stop() {
    clearTimeout(timer);
}

prev.bind('click', function() {
    if (imgs.is(':animated')) {
        return;
    }
    if (index == 1) {
        index = 3;
    }
    else {
        index -= 1;
    }
    animate(1200);
    showButton();
})

next.bind('click', function() {
    if (imgs.is(':animated')) {
        return;
    }
    if (index == 3) {
        index = 1;
    }
    else {
        index +=1;
    }
    animate(-1200);
    showButton();
});

buttons.each(function () {
    $(this).bind('click', function () {
        if (imgs.is(':animated') || $(this).attr('class')=='on') {
            return;
        }
        var myIndex = parseInt($(this).attr('index'));
        var offset = -1200 * (myIndex - index);

        animate(offset);
        index = myIndex;
        showButton();
    })
});

carousel.hover(stop,play);

play();




// 框画的图片尺寸
var realWidth = 0;
var realHeight = 0;
$('.khbox img').load(function() {
    $('.khbox .img img').each(function() {
        realWidth = $(this).width();
        realHeight = $(this).height();
        if ( realWidth > realHeight ) {
            $(this).width(Math.round(260/realHeight * realWidth));
            $(this).height(260);
        }
        else if ( realWidth < realHeight ) {
            $(this).width(260);
            $(this).height(Math.round(260/realWidth * realHeight));
        }
        else {
            $(this).width(260);
            $(this).height(260);
        }
    })
})



//个人主页翻页按钮hover效果
$('#prevpage').mouseover( function() {
    $(this).animate({width:'110px'},100);
})

$('#prevpage').mouseout( function() {
    $(this).animate({width:'40px'},100);
})

$('#nextpage').mouseover( function() {
    $(this).animate({width:'110px'},100);
})

$('#nextpage').mouseout( function() {
    $(this).animate({width:'40px'},100);
})
