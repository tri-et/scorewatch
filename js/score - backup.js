/**
 * Created by Tri Pham on 8/6/2017.
 */

/*Set Active For Menu*/
$(function () {
    $('.mainMenu ul li').click(function () {
        $('.mainMenu ul li hr').removeClass('activeMenu');
        $('.mainMenu ul li a span:nth-child(2)').removeClass('activeMenu');
        $(this).find('hr').addClass('activeMenu');
        if(!$(this).hasClass('menuRight')){
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
    })
});

function openMenuSideBar() {
    $('html').css('overflow-y','hidden');
    $('#menuSideBar').css('display','block')
}

function closeMenuSideBar() {
    $('#menuSideBar').fadeOut("slow");
}

function openAboutUs() {
    $('html').css('overflow-y','hidden');
    $('#aboutUs').css('display','block');
}

function closeAboutUs() {
    $('html').css('overflow-y','auto');
    $('#aboutUs').fadeOut("slow");
}
function openLogin(el) {
    $('html').css('overflow-y','hidden');
    if (el.title == 'login'){
        $('#windowLogin').css('display','block');
    }else{
        $('#logout').css('display', 'block');
    }

}

function closeLogin() {
    $('#windowLogin').fadeOut('slow');
}
function loginGoogle() {
    $('html').css('overflow-y','auto');
    $('.myAccount').css('display', 'block');
    $('.login>a>span').text('LOGOUT');
    $('.login>a>img').attr('src', 'Assets/menu_logout@1x.png');
    $('.login>a').attr('title', 'logout');
    $('#windowLogin').fadeOut('slow');
}
function closeNotification(divId) {
    $('html').css('overflow-y','auto');
    $('#' + divId).fadeOut(500, function () {
        $('#' + divId).css('display', 'none');
    });
}
function openNotification(divid) {
    $('#' + divid).css('display', 'block');
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
    $('html').css('overflow-y','hidden');
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
    $('#windowLiveScoresDetail').css('display','block');
}
function openHelp() {
    $('html').css('overflow-y','hidden');
    $('#windowHelp').css('display', 'block');
}

function closeWindowLiveScoresDetail() {
    $('#windowLiveScoresDetail').fadeOut('slow');
}
function openTabMenu(menuId) {
        closeMenuSideBar();
        $('.mainContent>div[class="w3-row"]>div').hide()
        $('.mainContent>div[class="w3-row"]>div[id='+menuId+']').show();
}
function learMore(obj) {
    $(obj).closest('div').prev().animate({height:'227px'},500)
}