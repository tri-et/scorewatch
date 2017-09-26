/**
 * Created by Tri Pham on 8/6/2017.
 */
var predictionData;
var liveScoreData;
window.Event = new class {
    constructor() {
        this.vue = new Vue();
    }

    fire(event, data = null) {
        this.vue.$emit(event, data);
    }

    listen(event, callback) {
        this.vue.$on(event, callback);
    }
};

predictionData = new Vue({
    el: '#content',
    data: {
        preGame: [],
        inPlay: [],
        colWidth: $('.colInPlay').width()
    },
    filters: {
        matchDate: function (value) {
            var date = new Date(value);
            return date.getHours() + ':' + date.getMinutes();
        }
    },
    methods: {
        setWidth: function (value) {
            var widthDiv = '';
            if (value.length >= 10) {
                widthDiv = '87px';
            } else {
                widthDiv = 'auto';
            }
            return widthDiv;
        },
        textLength: function (value) {
            return value.trim().length;
        },
        sendDataDetail: function (val) {
            Event.fire('predictionDetail', val);
        },
    },
    mounted(){
        getDataPrediction();
    }
});

liveScoreData = new Vue({
    el: '#liveScores',
    data: {
        league: [],
        leagueCol2: [],
        liveScore: []
    },
    methods: {
        setLineHeight: function (val) {
            return val == 'FT' ? 3 : 'none'
        },
        sendDataDetail: function (val) {
            Event.fire('livescoreDetail', val);
        }
    },
    mounted(){
        getDataLiveScore();
    }
});
/*Set Active For Menu*/


$(function () {
    $('.mainMenu ul li:not(.menuRight):not(:first-child)').click(function () {
        if (!$('.iconMenu').is(':hidden')) {
            openMenuSideBar();
        } else {
            $('.mainMenu ul li hr').removeClass('activeMenu');
            $('.mainMenu ul li a span:nth-child(2)').removeClass('activeMenu');
            $(this).find('hr').addClass('activeMenu');
            if (!$(this).hasClass('iconMenu')) {
                if ($(this).find('a>span:nth-child(1)')[0].innerText == 'LIVE SCORES') {
                    $($('.mainMenu ul li[class="menuRight"]')[0]).css('display', 'none')
                } else {
                    $($('.mainMenu ul li[class="menuRight"]')[0]).css('display', 'block')
                }
            }
            if (!$(this).hasClass('menuRight')) {
                $(this).find('span:nth-child(2)').addClass('activeMenu');
            }
        }
    });
    $('#listMenuSideBar ul li').click(function () {
        $('#listMenuSideBar ul li').removeClass('activeMenuSideBar');
        $(this).addClass('activeMenuSideBar');
    });

    $('.mainMenu ul li').mouseover(function () {
        if (!$('.iconMenu').is(':hidden')) {
            $($(this).find('a')).css('background-color', '');
        } else {
            //set background for menu on desktop
            if ($($(this).find('a')).find('hr').hasClass('activeMenu')) {
                $($(this).find('a')).css('background-color', 'rgba(255,255,255,0.1)');
            } else {
                $($(this).find('a')).css('background-color', 'rgba(0,0,0,0.1)');
            }
        }

    }).mouseout(function () {
        $($(this).find('a')).css('background-color', '');
    });

    $(window).resize(function () {
        responsive();
        resizeInputSearch();
        shortTeamName();
    });
    responsive();
    shortTeamName();
});
function getDataPrediction() {
    axios.get('http://underground.tips/InplayPrediction/get_inplay_prediction')
        .then(function (response) {
            predictionData.preGame = response.data.Pregame;
            //predictionData.preGame = [response.data.Pregame[0]];
            predictionData.inPlay = response.data.Running;

            setTimeout('getDataPrediction()',10000);
            /*setTimeout(function () {
                predictionData.preGame = pregameData;
                if(!$('#predictionDetail').is(':hidden')){
                   let matchID=$('#predictionDetail').attr('data-match-id');
                   let newData= predictionData.preGame.find(x => x.match_code == matchID);
                    predictionData.sendDataDetail(newData);
                }
            },7000);

            setTimeout(function () {
                predictionData.preGame = pregameData1;
                if(!$('#predictionDetail').is(':hidden')){
                    let matchID=$('#predictionDetail').attr('data-match-id');
                    let newData= predictionData.preGame.find(x => x.match_code == matchID);
                    predictionData.sendDataDetail(newData);
                }
            },20000);*/
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getDataLiveScore() {
    axios.get('http://www.hasilskor.com/API/JSON.aspx?date=2017-09-26&sport=soccer&s=26PDpiffaaBbGrBdfgnrK2pknndskc1f3IMeKLW6PqdprBMHMqSTQ7gcmlcx7jZMxmyeTTBXRqwDh5p044MJHrf')
        .then(function (response) {
            var leagueName = [];
            for (var i = 0; i < response.data.r.length; i++) {
                if ($.inArray(response.data.r[i][5], leagueName) == (-1)) {
                    leagueName.push(response.data.r[i][5]);
                }
            }
            var leagueNameCl2 = leagueName.splice(0, Math.round(leagueName.length / 2));
            liveScoreData.league = leagueName;
            liveScoreData.leagueCol2 = leagueNameCl2;
            liveScoreData.liveScore = response.data.r;
            //setTimeout('getDataLiveScore()',10000);
        })
        .catch(function (error) {
            console.log(error);
        });
}
function resizeInputSearch() {
    var width = 0;
    $('.mainMenu ul li[class="menuRight"]:not(:hidden):not(:last-child)').each(function () {
        var $this = $(this);
        width += $this.outerWidth();
    });
    if (!$('.mainMenu ul li[class="iconMenu"]').is(':hidden') && !$('#searchDiv').is(':hidden')) {
        $('#searchDiv').css('display', 'flex');
        $('#searchDiv input').animate({width: '100%'});
        $('#searchDiv').animate({width: '100%'});
        $('#searchDiv input').css('margin-left', '64px');
    } else {
        if (!$('#searchDiv').is(':hidden')) {
            $('#searchDiv').animate({width: width + 'px'});
            $('#searchDiv input').animate({width: '100%'});
            $('#searchDiv i').css({'display': 'none'});
        }
    }
}
function checkBoxDontAskMe() {
    if ($("#ckdontask").prop("checked")) {
        $("#ckdontask").prop("checked", false)
    } else {
        $("#ckdontask").prop("checked", true)
    }
}
function responsive() {
    var browserWidth = $(window).width();
    var browserHeight = $(window).height();
    $('#contentInPlayPreGame').css('height',browserHeight-138);
    $('#contentLiveScores').css('height',browserHeight-198);
    $('.liveStreamDetail').css('height',browserHeight-300);
    if($('.headerDetailLiveStream').css('display')=='none'){
        //set height for col detail when have tab Back
        $('#colDetail').css('height',browserHeight-64);
        $('#stats').css('height',browserHeight-279);
    }else{
        $('#colDetail').css('height',browserHeight);
        $('#stats').css('height',browserHeight-265);
    }

    //$('#stats').css('height',browserHeight-320);
    //$('#predictionDetail').css('height',browserHeight-64);
    //$('#contentLiveScores').css('height',browserHeight-198);
    //$('#colDetail').css('height',browserHeight);

    if ((window.innerWidth - document.documentElement.clientWidth) != 0) {
        if (browserWidth > 825) {
            // reset main menu*/
            $('.mainMenu ul li:nth-child(8)').css('display', 'block');
            $('.mainMenu ul li:nth-child(2) a span:nth-child(2)').text('predictions');
            $('.mainMenu ul li:nth-child(2) a span:nth-child(2)').css('color', '');
        }
        if (browserWidth < 672) {
            if ($('#predictionDetail').is(':hidden')) {
                $('#content div[class="mask"]').css('display', 'none');
                $('#colDetail').hide();
                //$('#colDetailLiveScores').hide();
            } else {
                $('#content div[class="mask"]').removeAttr("style");
            }

            if ($('#windowLiveScoresDetail').is(':hidden')) {
                $('#liveScores div[class="mask"]').css('display', 'none');
                $('#colDetailLiveScores').css('display', 'none');
            } else {
                $('#colDetailLiveScores div[class="mask"]').removeAttr("style");
                //$('html').css('overflow-y', 'hidden');
            }
        } else {
            $('#colDetail').show();
            $('#colDetailLiveScores').show();
        }
    } else {
        if (browserWidth <= 669) {
            if ($('#predictionDetail').is(':hidden')) {
                $('#content div[class="mask"]').css('display', 'none');
                $('#colDetail').hide();
                //$('#colDetailLiveScores').hide();
            } else {
                $('#content div[class="mask"]').removeAttr("style");
            }

            if ($('#windowLiveScoresDetail').is(':hidden')) {
                $('#liveScores div[class="mask"]').css('display', 'none');
                $('#colDetailLiveScores').css('display', 'none');
            } else {
                $('#colDetailLiveScores div[class="mask"]').removeAttr("style");
                // $('html').css('overflow-y', 'hidden');
            }
        } else {
            $('#colDetail').show();
            $('#colDetailLiveScores').show();
        }
    }

    if (browserWidth > 842) {
        $('.mainMenu ul li:nth-child(8)').css('display', 'block');
        $('.mainMenu ul li:nth-child(2) a span:nth-child(2)').text('predictions');
        $('.mainMenu ul li:nth-child(2) a span:nth-child(2)').css('color', '');
    }
    if ($('#content div[class="mask"]').is(':hidden') || $('#colDetailLiveScores div[class="mask"]').is(':hidden')) {
        $('html').css('overflow-y', 'auto');
    } else {
        $('html').css('overflow-y', 'hidden');
    }
}
function backSearch(el) {
    var search = $('#btSearch');
    $(search).attr('title', 'hide');
    $('#searchDiv').animate({width: 0}, function () {
        $('#searchDiv').css('display', 'none');
    });
    $('#searchDiv input').val('');
    $(search).css('background-color', '');
    $(search).find('i').css('color', '#36569B');
    $(el).css('display', 'none');
}
function btSearch(el) {
    if (el.title == 'hide') {
        var width = 0;
        $('.mainMenu ul li[class="menuRight"]:not(:hidden):not(:last-child)').each(function () {
            var $this = $(this);
            width += $this.outerWidth();
        });
        $(el).css('background-color', '#36569B');
        $(el).find('i').css('color', '#fff');
        if (!$('.mainMenu ul li[class="iconMenu"]').is(':hidden')) {
            $('#searchDiv').css('display', 'flex');
            $('#searchDiv input').animate({width: '100%'});
            $('#searchDiv input').css('margin-left', '64px');
            $('#searchDiv').animate({width: '100%'}, function () {
                $('.mainMenu > ul li:nth-child(3)').css('box-shadow', 'none');
            });
        } else {
            $('#searchDiv').css('display', 'block');
            $('#searchDiv input').animate({width: '100%'});
            $('#searchDiv').animate({width: width + 'px'}, function () {
                $('.mainMenu > ul li:nth-child(3)').css('box-shadow', 'none');
            });
        }
        /*if ($(window).width() <= 842) {
         $('#searchDiv').css('display', 'flex');
         $('#searchDiv input').animate({width: '100%'});
         $('#searchDiv input').css('margin-left', '64px');
         $('#searchDiv').animate({width: '100%'}, function () {
         $('.mainMenu > ul li:nth-child(3)').css('box-shadow', 'none');
         });
         } else {
         $('#searchDiv').css('display', 'block');
         $('#searchDiv input').animate({width: '100%'});
         $('#searchDiv').animate({width: width + 'px'}, function () {
         $('.mainMenu > ul li:nth-child(3)').css('box-shadow', 'none');
         });
         }*/
        el.title = 'show'
    } else {
        if ($('#searchDiv input').val().length == 0) {
            el.title = 'hide';
            $('.mainMenu > ul li:nth-child(3)').css('box-shadow', '1px 0 0 0 rgba(0, 0, 0, 0.2)');
            $(el).css('background-color', '');
            $(el).find('i').css('color', '#36569B');
            $('#searchDiv').animate({width: 0}, function () {
                $('#searchDiv').css('display', 'none');
            })
        } else {
            $(el).css('background-color', '#6A6A6A');
            $('#searchDiv input').css('margin-left', '');
            if (!$('.mainMenu ul li[class="iconMenu"]').is(':hidden')) {
                $('#searchDiv i').css({'display': 'block'});
            }
            setTimeout(function () {
                $(el).css('background-color', '#36569B');
                $('.clearText').css('visibility', 'visible');
            }, 1000)
            $('.clearText').css('visibility', 'hidden');
        }
    }
}
function shortTeamName() {
    if ($('.colInPlay').width() == 320) {
        var teamName = $('.inPlayButton>div:nth-child(2) div[class="marquee"],.preGameButton>div:nth-child(2) div[class="marquee"],.expiredButton>div:nth-child(2) div[class="marquee"]');
        for (var j = 0; j < teamName.length; j++) {
            if ($(teamName[j]).attr('data-marquee').trim().length >= 13) {
                $(teamName[j]).css('display', 'inline-block');
                $($(teamName[j]).next()).css('display', 'none');
                $($(teamName[j]).next().next()).css('display', 'none');
            }
        }
    } else {
        var teamName = $('.inPlayButton>div:nth-child(2) div[class="marquee"],.preGameButton>div:nth-child(2) div[class="marquee"],.expiredButton>div:nth-child(2) div[class="marquee"]');
        for (var j = 0; j < teamName.length; j++) {
            $(teamName[j]).css('display', 'none');
            $($(teamName[j]).next()).css('display', 'none');
            $($(teamName[j]).next().next()).css('display', 'inline-block');
        }
    }
}
function openMenuSideBar() {
    /*$('html').css('overflow-y', 'hidden');*/
    $('#menuSideBar').addClass('slide-in');
}

function closeMenuSideBar() {
    /*$('html').css('overflow-y', 'auto');*/
    $('#menuSideBar').removeClass('slide-in');
    $('#menuSideBar').addClass('slide-out');

}

function openAboutUs() {
    $('html').css('overflow-y', 'hidden');
    $('#aboutUs').css('display', 'block');
}

function openLogin(el) {
    $('html').css('overflow-y', 'hidden');
    if (el.title == 'login') {
        $('#windowLogin').fadeIn(300);
    } else {
        $('#logout').fadeIn(300);
    }

}

function closeLogin() {
    $('html').css('overflow-y', 'auto');
    $('#windowLogin').fadeOut(300);
}
function loginGoogle() {
    $('html').css('overflow-y', 'auto');
    $('.myAccount').css('display', 'block');
    $('.login>a>span').text('LOGOUT');
    $('.login>a>img').attr('src', 'Assets/menu_logout@1x.png');
    $('.login>a').attr('title', 'logout');
    $('#windowLogin').fadeOut('slow');
}
function closeNotification(divId) {
    $('html').css('overflow-y', 'auto');
    $('#' + divId).fadeOut(100, function () {
        $('#' + divId).css('display', 'none');
    });
}
function openNotification(divid) {
    $('#' + divid).fadeIn(300);
}
function logout() {
    $('.myAccount').css('display', 'none');
    $('.login>a>span').text('LOGIN/SIGN UP');
    $('.login>a>img').attr('src', 'Assets/menu_login@1x.png');
    $('.login>a').attr('title', 'login');
    $('#logout').css('display', 'none');
}
function openAccount() {
    $('#account').css('display', 'block');
}

function closeAccount() {
    $('#account').fadeOut('slow');
}
function openUpgrade() {
    $('html').css('overflow-y', 'hidden');
    $('#upgrade').css('display', 'block');
}

function closeUpgrade() {
    $('#upgrade').fadeOut('slow');
}

function openTransaction() {
    $('#transaction').css('display', 'block');
}

function closeTransaction() {
    $('#transaction').fadeOut('slow');
}

function openFilter() {
    $('html').css('overflow-y', 'hidden');
    $('#filterId').css('display', 'block');
}
function closeWindowLiveScoresDetail() {
    var browserWidth = $(window).width();
    $('html').css('overflow-y', 'auto');
    $('.mask').css('display', 'none');
    $('#windowLiveScoresDetail').fadeOut('slow');
    $('#colDetailLiveScores div[class="noMatch"]').css('display', 'block');
    if (browserWidth < 672) {
        $('#colDetailLiveScores').css('display', 'none');
    }
    $('.listlivescores ul li').removeClass('selectedLiveScore');
}

function closeWindowPreDetail() {
    var browserWidth = $(window).width();
    $('html').css('overflow-y', 'auto');
    $('#content div[class="mask"]').css('display', 'none');
    $('#predictionDetail').fadeOut('slow');
    $('#colDetail div[class="noMatch"]').css('display', 'block');
    $('.footerDetail').css('display', 'none');
    if (browserWidth < 672) {
        $('#colDetail').css('display', 'none');
    }
    $('.inPlayButton').removeClass('inPlayButtonSelected');
    $('.preGameButton').removeClass('preGameButtonSelected');
}


function openLiveScoresDetail(obj) {
    let data=liveScoreData.liveScore.find(x => x[0] == obj.id);
    liveScoreData.sendDataDetail(data);
    $('#colDetailLiveScores div[class="noMatch"]').hide();
    $('#windowLiveScoresDetail').css('display', 'block');
    $('#colDetailLiveScores').css('display', 'block');
    $('#liveScores div[class="mask"]').removeAttr("style");
    if ($('#liveScores div[class="mask"]').is(':hidden')) {
        $('html').css('overflow-y', 'auto');
    } else {
        $('html').css('overflow-y', 'hidden');
    }
    $('.listlivescores ul li').removeClass('selectedLiveScore');
    $(obj).addClass('selectedLiveScore');
    $('#windowLiveScoresDetail').addClass('slide-in-right');
}

function openPredictionMatchDetail(el) {
    var data;
    $('.inPlayButton').removeClass('inPlayButtonSelected');
    $('.preGameButton').removeClass('preGameButtonSelected');
    if ($(el).hasClass('preGameButton')) {
        data=predictionData.preGame.find(x => x.match_code == el.id);
        $('.hederDetailInPlay').css('background-image', 'url("Assets/bg_header_match_pregame_detail.png")');
        $('#predictionDetail button[class="inPlayButton"]').css('background-image', 'url("Assets/bg_pre_game_item@2x.png")');
        $(el).addClass('preGameButtonSelected');
        $('.footerDetail').css({
            'background-image': 'url("Assets/bg_pre_game_item@2x.png")',
            'color': '#8EC89F'
        });
    } else {
        data=predictionData.inPlay.find(x => x.match_code == el.id);
        $('.hederDetailInPlay').css('background-image', 'url("Assets/bg_header_match_detail.png")');
        $('#predictionDetail button[class="inPlayButton"]').css('background-image', 'url("Assets/bg_in_play_item@1x.png")');
        $(el).addClass('inPlayButtonSelected');
        $('.footerDetail').css({
            'background-image': 'url("Assets/bg_in_play_item@1x.png")',
            'color': '#F3AC9B'
        });
    }
    predictionData.sendDataDetail(data);
    $('#colDetail').css('display', 'block');
    $('.footerDetail').css('display', 'block');
    $('#content div[class="mask"]').removeAttr("style");
    $('#colDetail div[class="noMatch"]').hide();
    $('#predictionDetail').css('display', 'block');
    if ($('#content div[class="mask"]').is(':hidden')) {
        $('html').css('overflow-y', 'auto');
    } else {
        $('html').css('overflow-y', 'hidden');
    }
}
function openStatsLiveStream(statusId, div) {
    if (statusId == 'stats') {
        $('#stats').css('display', 'block');
        $('#livestream').css('display', 'none');
    } else {
        $('#stats').css('display', 'none');
        $('#livestream').css('display', 'block');
    }
    $('#statslivestream div').removeClass("activeStatsLiveStream");
    $(div).addClass("activeStatsLiveStream");
}

function openTabMenu(menuId) {

    //closeMenuSideBar();
    $('.mainContent>div[class="w3-row"]>div').hide()
    $('.mainContent>div[class="w3-row"]>div[id=' + menuId + ']').css('display', 'flex');
}

function openTabMenuSideBar(menuId) {
    if (menuId == 'liveScores') {
        $('.mainMenu ul li:nth-child(2) a span:nth-child(2)').text('live scores');
        $('.mainMenu ul li:nth-child(2) a span:nth-child(2)').css('color', '#36569B');
        $('.mainMenu ul li:nth-child(8)').css('display', 'none');
        $('.mainMenu ul li:nth-child(3) hr').addClass('activeMenu');
        $('.mainMenu ul li:nth-child(3) a span:nth-child(2)').addClass('activeMenu');
        $('.mainMenu ul li:nth-child(2) hr').removeClass('activeMenu');
        $('.mainMenu ul li:nth-child(2) a span:nth-child(2)').removeClass('activeMenu');
        $($('.mainMenu ul li[class="menuRight"]')[0]).css('display', 'none')
    } else {
        $('.mainMenu ul li:nth-child(2) a span:nth-child(2)').text('predictions');
        $('.mainMenu ul li:nth-child(2) a span:nth-child(2)').css('color', '#36569B');
        $('.mainMenu ul li:nth-child(8)').css('display', 'block');
        $('.mainMenu ul li:nth-child(2) hr').addClass('activeMenu');
        $('.mainMenu ul li:nth-child(2) a span:nth-child(2)').addClass('activeMenu');
        $('.mainMenu ul li:nth-child(3) hr').removeClass('activeMenu');
        $('.mainMenu ul li:nth-child(3) a span:nth-child(2)').removeClass('activeMenu');
        $($('.mainMenu ul li[class="menuRight"]')[0]).css('display', 'block')
    }
    closeMenuSideBar();
    $('.mainContent>div[class="w3-row"]>div').hide()
    $('.mainContent>div[class="w3-row"]>div[id=' + menuId + ']').css('display', 'flex');
}
function learMore(obj) {
    $(obj).closest('div').prev().animate({height: '227px'}, 500)
}

function clearText() {
    $('#searchDiv input').val('');
    $('#searchDiv input').css('box-shadow', '0px 2px 0px 0px rgba(0, 0, 0,0.2)');
    //$('.clearText').css('visibility', 'hidden');
}



