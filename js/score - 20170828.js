/**
 * Created by Tri Pham on 8/6/2017.
 */
teamnameshort = [
    ['Manchester United', 'Man. United'],
    ['Libertad Asuncion', 'L.A']
]
/*Set Active For Menu*/
$(function () {
    $('#searchDiv input').keyup(function () {
        $('.clearText').css('visibility', (this.value.length) ? "visible" : "hidden");
        $('#searchDiv input').css('box-shadow', '0px 2px 0px 0px rgba(96, 135, 219,1)');
    });
    $('.mainMenu ul li:not(.menuRight)').click(function () {
        $('.mainMenu ul li hr').removeClass('activeMenu');
        $('.mainMenu ul li a span:nth-child(2)').removeClass('activeMenu');
        $(this).find('hr').addClass('activeMenu');
        if (!$(this).hasClass('menuRight')) {
            $(this).find('span:nth-child(2)').addClass('activeMenu');
        }

    });
    $('.homeAway').hover(function () {
        if ($(this.children[1]).hasClass('arrow-up')) {
            $(this).css('background-color', '#00b33c');
            $(this.children[1]).data('prehovercolorarrow', $(this.children[1]).css('border-bottom')).css('border-bottom', '5px solid #fff');
        } else {
            $(this).css('background-color', '#FF9A84');
            $(this.children[1]).data('prehovercolorarrow', $(this.children[1]).css('border-top')).css('border-top', '5px solid #fff');
        }
        $(this.children[0]).data('prehovercolor', $(this.children[0]).css('color')).css('color', '#fff');

    }, function () {
        if ($(this.children[1]).hasClass('arrow-up')) {
            $(this.children[1]).css('border-bottom', $(this.children[1]).data('prehovercolorarrow'));
        } else {
            $(this.children[1]).css('border-top', $(this.children[1]).data('prehovercolorarrow'));
        }
        $(this.children[0]).css('color', $(this.children[0]).data('prehovercolor'));
        $(this).css('background-color', '')
    });

    $(window).resize(function () {
        var browserWidth = $(window).width();
        if ((window.innerWidth - document.documentElement.clientWidth) != 0) {
            if (browserWidth < 825) {
                $('.mainMenu ul li:not(:nth-child(8)):not(:nth-child(2))').css('display', 'none');
            }else {
                $('.mainMenu ul li').css('display', 'block');
                $('.mainMenu ul li:nth-child(1),:nth-child(5)').css('display', 'none');
            }
        }
        /* if(browserWidth<=842){
         $('.mainMenu ul li:not(:nth-child(9)):not(:nth-child(2)), .mainMenu a span:not(:nth-child(2)):not(.icon)').css('display','none');
         }

         if((browserWidth>=843 && browserWidth<1280)){

         $('.mainMenu ul li:not(:nth-child(1)):not(:nth-child(5)), .mainMenu a span:not(:nth-child(2)):not(.icon)').css('display','block');
         $('.mainMenu ul li:nth-child(5)').css('display','none');
         }
         if(browserWidth>1280){

         $('.mainMenu ul li:not(:nth-child(1)):not(:nth-child(5)), .mainMenu a span:not(:nth-child(2)):not(.icon)').css('display','block');
         $('.mainMenu ul li:nth-child(5)').css('display','none');
         }*/
        changeTeamName();
    });
    changeTeamName();
    //drawPreGame(datapregame.Pregame);
    getDataInPlayPreGame();

    getDataLiveScore();

});
function getDataInPlayPreGame() {
    $.ajax({
        type: 'GET',
        url: 'http://underground.tips/InplayPrediction/get_inplay_prediction',
        error: function (data) {
            console.log('error', data);
        },
        success: function (data) {
            var dataJson = JSON.parse(data);
            new Vue({
                el: '#content',
                data: {
                    preGame: dataJson.Pregame,
                    inPlay: dataJson.Running
                },
                filters: {
                    matchDate: function (value) {
                        var date = new Date(value);
                        return date.getHours() + ':' + date.getMinutes();
                    }
                }
            });
        }
    });
}
function getDataLiveScore() {
    $.ajax({
        type: 'GET',
        url: 'http://www.hasilskor.com/API/JSON.aspx?date=2017-08-28&sport=soccer&s=26PDpiffaaBbGrBdfgnrK2pknndskc1f3IMeKLW6PqdprBMHMqSTQ7gcmlcx7jZMxmyeTTBXRqwDh5p044MJHrf',
        error: function (data) {
            console.log('error', data);
        },
        success: function (data) {
            var leagueName = [];
            var leagueNameCl2 = [];
            for (var i = 0; i < data.r.length; i++) {
                if ($.inArray(data.r[i][5], leagueName) == (-1)) {
                    leagueName.push(data.r[i][5]);
                }
            }
            leagueNameCl2 = leagueName.splice(0, Math.round(leagueName.length / 2));
            new Vue({
                el: '#liveScores',
                data: {
                    league: leagueName,
                    leagueCol2: leagueNameCl2,
                    liveScore: data.r
                }
            });
        }
    });
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
        if ($(window).width() <= 842) {
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
            $('#searchDiv i').css({'display': 'block'});
            $('.clearText').css('visibility', 'hidden');
        }
    }
}
function changeTeamName() {
    if ($('.colInPlay').width() == 320) {
        for (var i = 0; i < teamnameshort.length; i++) {
            var teamName = $('.inPlayButton>div:nth-child(2)>span:first-child,.preGameButton>div:nth-child(2)>span:first-child,.expiredButton>div:nth-child(2)>span:first-child');
            for (var j = 0; j < teamName.length; j++) {
                if ($(teamName[j]).text() == teamnameshort[i][0]) {
                    $(teamName[j]).text(teamnameshort[i][1])
                }
            }
        }
    } else {
        for (var i = 0; i < teamnameshort.length; i++) {
            var teamName = $('.inPlayButton>div:nth-child(2)>span:first-child,.preGameButton>div:nth-child(2)>span:first-child,.expiredButton>div:nth-child(2)>span:first-child');
            for (var j = 0; j < teamName.length; j++) {
                if ($(teamName[j]).text() == teamnameshort[i][1]) {
                    $(teamName[j]).text(teamnameshort[i][0])
                }
            }
        }
    }
}
function openMenuSideBar() {
    $('html').css('overflow-y', 'hidden');
    $('#menuSideBar').css('display', 'block')
}

function closeMenuSideBar() {
    $('html').css('overflow-y', 'auto');
    $('#menuSideBar').fadeOut("slow");
}

function openAboutUs() {
    $('html').css('overflow-y', 'hidden');
    $('#aboutUs').css('display', 'block');
}

function openLogin(el) {
    $('html').css('overflow-y', 'hidden');
    if (el.title == 'login') {
        $('#windowLogin').css('display', 'block');
    } else {
        $('#logout').css('display', 'block');
    }

}

function closeLogin() {
    $('html').css('overflow-y', 'auto');
    $('#windowLogin').fadeOut('slow');
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
    $('#' + divId).fadeOut(500, function () {
        $('#' + divId).css('display', 'none');
    });
}
function openNotification(divid) {
    $('#' + divid).fadeIn('slow');
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

function openLiveScoresDetail() {
    $('.noMatch').hide();
    $('#windowLiveScoresDetail').css('display', 'block');
}
function openFilter() {
    $('html').css('overflow-y', 'hidden');
    $('#filterId').css('display', 'block');
}
function closeWindowLiveScoresDetail() {
    $('html').css('overflow-y', 'auto');
    $('.mask').css('display', 'none');
    $('#windowLiveScoresDetail').fadeOut('slow');
    $('.noMatch').css('display', 'block');
}

function closeWindowPreDetail() {
    $('html').css('overflow-y', 'auto !important');
    $('.mask').css('display', 'none');
    $('#predictionDetail').fadeOut('slow');
    $('.noMatch').css('display', 'block');
}
function openPredictionMatchDetail(el) {
    $('.inPlayButton').removeClass('inPlayButtonSelected');
    $('.preGameButton').removeClass('preGameButtonSelected');
    if ($(el).hasClass('preGameButton')) {
        $('.hederDetailInPlay').css('background-image', 'url("Assets/bg_header_match_pregame_detail.png")');
        $('#predictionDetail button[class="inPlayButton"]').css('background-image', 'url("Assets/bg_pre_game_item@2x.png")');
        $(el).addClass('preGameButtonSelected');
    } else {
        $('.hederDetailInPlay').css('background-image', 'url("Assets/bg_header_match_detail.png")');
        $('#predictionDetail button[class="inPlayButton"]').css('background-image', 'url("Assets/bg_in_play_item@1x.png")');
        $(el).addClass('inPlayButtonSelected');
    }

    $('.noMatch').hide();
    $('#predictionDetail').css('display', 'block');
}
function openTabMenu(menuId) {

    closeMenuSideBar();
    $('.mainContent>div[class="w3-row"]>div').hide()
    $('.mainContent>div[class="w3-row"]>div[id=' + menuId + ']').css('display', 'flex');
}

function openTabMenuSideBar(menuId) {
    $('.mainMenu ul li').css('display', 'block');
    if (menuId == 'liveScores') {
        $('.mainMenu ul li:not(:nth-child(3)), .mainMenu a span:not(:nth-child(2)):not(.icon)').css('display', 'none');
        // $('.mainMenu ul li:nth-child(5)').css('display', 'block');
    } else {
        $('.mainMenu ul li:not(:nth-child(8)):not(:nth-child(2)), .mainMenu a span:not(:nth-child(2)):not(.icon)').css('display', 'none');
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
    $('.clearText').css('visibility', 'hidden');
}


/*Draw Data*/
function drawPreGame(data) {
    var rowPreGame = '';

    for (var i = 0; i < data.length; i++) {
        var dataRow = data[i];
        rowPreGame += '<div class="w3-row" style="padding: 6px 5px 6px 5px">' +
            '<div class="match" id=' + dataRow.match_code + '>' +
            '<div class="w3-row" style="color: black;padding-bottom: 3px;">' +
            '<div class="w3-col timeInPlay" style="width:17%">12:30</div>' +
            '<div class="w3-col" style="width:65%">' + dataRow.team_home + '</div>' +
            '<div class="w3-col" style="width:18%;text-align: right;padding-right: 10px">' + dataRow.score_home + '</div>' +
            '</div>' +
            '<div class="w3-row" style="color: black;">' +
            '<div class="w3-col timeInPlay" style="width:17%">Kickoff</div>' +
            '<div class="w3-col" style="width:65%">' + dataRow.team_away + '</div>' +
            '<div class="w3-col" style="width:18%;text-align: right;padding-right: 10px">' + dataRow.score_away + '</div>' +
            '</div>' +
            '<div class="w3-row">' +
            '<button class="preGameButton">' +
            '<div class="w3-col" style="width:14%;text-align: left;padding-left: 5px">' +
            '<img src="Assets/icon_tick@1x.png" width="15" style="margin-bottom: -4px;">' +
            '</div>' +
            '<div class="w3-col" style="width:66%;text-align: left;">' +
            '<span style="font-weight: bold">' + dataRow.team_home + '</span>' +
            '<span> [-0.5] </span>' +
            '<span>@ </span>' +
            '<span style="font-weight: bold">0.91</span>' +
            '</div>' +
            '<div class="w3-col" style="width:20%;text-align: right">' +
            '<span>-</span>' +
            '<img src="Assets/icon_clock@1x.png" width="15" style="margin-bottom: -4px">' +
            '</div>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
    $(rowPreGame).appendTo('#pregame');
}