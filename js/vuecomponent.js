/**
 * Created by Tri Pham on 9/21/2017.
 */
Vue.component('predictiondetail', {
    //props: ['testname'],
    template: `<div id="predictionDetail" class="w3-animate-right" v-bind:data-match-id="dataDetail.match_code" style="display: none;">
                    <div class="w3-row headerDetailLiveStream" style="background-color: #fff;height: 50px;width: 100%;">
                        <div class="w3-col" style="width: 50%;">
                            <button style="padding-top: 14px;border: none;background-color: #fff;cursor: pointer;outline: none"
                                    onclick="closeWindowPreDetail()">
                                <div style="float: left;margin-right: 10px">
                                    <i class="material-icons" style="color: #577DBB;">keyboard_backspace</i>
                                </div>
                                <div style="float: left">
                                    <span style="color: #577DBB;font-size: 14px">BACK</span>
                                </div>
                            </button>
                        </div>
                        <div class="w3-col" style="width: 50%;text-align: right;padding-right: 20px;padding-top: 14px">
                            <i class="material-icons" style="color: #577DBB;cursor: pointer"
                               onclick="openNotification('openNewTab');">open_in_new</i>
                        </div>
                    </div>
                    <div style="background-color: #4CAF50;height: 180px;">
                        <div class="w3-row" style="height: 135px;background-color: #3f51b5;position: relative">
                            <div class="w3-col" style="width: 50%;background-color: #9c27b0;">
                                <img src="Assets/footballteam.jpg" width="100%" height="140">
                                <div class="description">
                                    <span style="padding-left: 20px">{{dataDetail.team_home}}</span>
                                    <span style="float: right;padding-right: 8px">{{dataDetail.score_home}}</span>
                                </div>
                            </div>
                            <div class="w3-col" style="width: 50%;background-color: #fff">
                                <img src="Assets/footballteam1.jpg" width="100%" height="140">
                                <div class="description">
                                    <span style="float: left;padding-left: 8px">{{dataDetail.score_away}}</span>
                                    <span style="padding-right: 20px;float: right">{{dataDetail.team_away}}</span>
                                </div>
                            </div>
                            <div class="live">
                                <span>LIVE</span><br>
                                <span>'86</span>
                            </div>
                        </div>
                        <div style="height: 75px;background-color: #fff; position: relative;" class="w3-card-4">
                            <div style="padding: 0px 20px 0px 20px;position: absolute;width: 100%;">
                                <button class="inPlayButton" style="margin-top: -27px;cursor: default !important;">
                                    <div class="w3-col" style="width:66%;text-align: left;">
                                        <span style="font-weight: bold">{{dataDetail.team_home}}</span>
                                        <span>[0.5]</span>
                                        <span>@</span>
                                        <span style="font-weight: bold">0.91</span>
                                    </div>
                                    <div class="w3-col" style="width:34%;text-align: right">
                                        <span>-</span>
                                        <img src="Assets/icon_clock@1x.png" width="15" style="margin-bottom: -4px">
                                    </div>
                                </button>
                            </div>
                            <div class="w3-row" id="statslivestream"
                                 style="color: #B5C0D7;font-weight: bold;font-size: 11px;margin-top: 5px;text-align: center;padding-top: 38px;cursor: pointer">
                                <div class="w3-col activeStatsLiveStream" style="width: 50%"
                                     onclick="openStatsLiveStream('stats',this)">STATS
                                </div>
                                <div class="w3-col" style="width: 50%;"
                                     onclick="openStatsLiveStream('livestream',this)">LIVE STREAM
                                </div>
                            </div>
                        </div>
                        <div id="stats">
                            <!--header ODD-->
                            <div class="hederDetailInPlay" style="font-weight: normal!important;font-size: 12px">
                                <div class="w3-row">
                                    <div style="width: 25%;text-align: left;padding-left: 20px;text-shadow: rgba(0, 0, 0,0.54) 0px 1px 2px;"
                                         class="w3-col">
                                        <span style="font-weight: bold">ODDS</span>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <span style="font-size: 14px">Handicap</span>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <span style="font-size: 14px">Home</span>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <span style="font-size: 14px">Away</span>
                                    </div>
                                </div>
                            </div>
                            <!--end header ODD-->
                            <!--list match detail 1 -->
                            <div class="listMatchDetail" style="text-align: center;font-size: 12px">
                                <div class="w3-row" v-show="dataDetail.sys.hdp!=''&&dataDetail.sys.odds_away!=''&&dataDetail.sys.odds_home!=''">
                                    <div style="width: 25%; height:100%;text-align: left;padding-left: 20px"
                                         class="w3-col">
                                        <span style="font-weight: bold" class="timeInPlay">M8</span>
                                    </div>
                                    <div style="width: 25%;height:100%" class="w3-col">
                                        <div>
                                            <span style="color: #AEAEAE;cursor:default">{{dataDetail.sys.hdp}}</span>
                                        </div>
                                    </div>
                                    <div style="width: 25%;height:100%" class="w3-col">
                                        <div class="homeAway" :class="sys.odds_home">
                                            <span style="cursor:default">{{dataDetail.sys.odds_home}}</span>
                                            <img :class="sys.odds_home|setArrow">
                                        </div>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <div class="homeAway" :class="sys.odds_away">
                                            <span style="cursor:default">{{dataDetail.sys.odds_away}}</span>
                                            <img :class="sys.odds_away|setArrow">
                                        </div>
                                    </div>
                                </div>
                                <div class="w3-row">
                                    <div style="width: 25%;text-align: left;padding-left: 20px" class="w3-col">
                                        <span>SBO</span>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <span style="color: #AEAEAE;cursor:default">{{dataDetail.sbo.hdp}}</span>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <div class="homeAway" :class="sbo.odds_home">
                                            <span style="cursor:default">{{dataDetail.sbo.odds_home}}</span>
                                            <img :class="sbo.odds_home|setArrow">
                                        </div>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <div class="homeAway" :class="sbo.odds_away">
                                            <span style="cursor:default">{{dataDetail.sbo.odds_away}}</span>
                                            <img :class="sbo.odds_away|setArrow">
                                        </div>
                                    </div>
                                </div>
                                <div class="w3-row" v-show="dataDetail.ibc.hdp!=''">
                                    <div style="width: 25%;text-align: left;padding-left: 20px" class="w3-col">
                                        <span>IBC</span>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <span style="color: #AEAEAE;cursor:default">{{dataDetail.ibc.hdp}}</span>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <div class="homeAway" :class="ibc.odds_home">
                                            <span style="cursor:default">{{dataDetail.ibc.odds_home}}</span>
                                            <img :class="ibc.odds_home|setArrow">
                                        </div>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <div class="homeAway" :class="ibc.odds_away">
                                            <span style="cursor:default">{{dataDetail.ibc.odds_away}}</span>
                                            <img :class="ibc.odds_away|setArrow">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--end list match detail 1-->
                            <!--start header OU-->
                            <div class="hederDetailInPlay" style="font-weight: normal!important;font-size: 12px">
                                <div class="w3-row">
                                    <div style="width: 25%;text-align: left;padding-left: 20px;text-shadow: rgba(0, 0, 0,0.54) 0px 1px 2px;"
                                         class="w3-col">
                                        <span style="font-weight: bold">OU</span>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <span style="font-size: 14px">Total Goals</span>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <span style="font-size: 14px">Over</span>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <span style="font-size: 14px">Under</span>
                                    </div>
                                </div>
                            </div>
                            <!--end header OU-->
                            <div class="listMatchDetail" style="text-align: center;font-size: 12px">
                                <div class="w3-row" v-show="dataDetail.sys.ou!=''&&dataDetail.sys.odds_over!=''&&dataDetail.sys.odds_under!=''">
                                    <div style="width: 25%; height:100%;text-align: left;padding-left: 20px"
                                         class="w3-col">
                                        <span style="font-weight: bold" class="timeInPlay">M8</span>
                                    </div>
                                    <div style="width: 25%;height:100%" class="w3-col">
                                        <div>
                                            <span style="color: #AEAEAE;cursor:default">{{dataDetail.sys.ou}}</span>
                                        </div>
                                    </div>
                                    <div style="width: 25%;height:100%" class="w3-col">
                                        <div class="homeAway" :class="sys.odds_over">
                                            <span style="cursor:default">{{dataDetail.sys.odds_over}}</span>
                                            <img :class="sys.odds_over|setArrow">
                                        </div>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <div class="homeAway" :class="sys.odds_under">
                                            <span style="cursor:default">{{dataDetail.sys.odds_under}}</span>
                                            <img :class="sys.odds_under|setArrow">
                                        </div>
                                    </div>
                                </div>
                                <div class="w3-row">
                                    <div style="width: 25%;text-align: left;padding-left: 20px" class="w3-col">
                                        <span>SBO</span>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <span style="color: #AEAEAE;cursor:default">{{dataDetail.sbo.ou}}</span>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <div class="homeAway" :class="sbo.odds_over">
                                            <span style="cursor:default">{{dataDetail.sbo.odds_over}}</span>
                                            <img :class="sbo.odds_over|setArrow">
                                        </div>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <div class="homeAway" :class="sbo.odds_under">
                                            <span style="cursor:default">{{dataDetail.sbo.odds_under}}</span>
                                            <img :class="sbo.odds_under|setArrow">
                                        </div>
                                    </div>
                                </div>
                                <div class="w3-row" v-show="dataDetail.ibc.hdp!=''">
                                    <div style="width: 25%;text-align: left;padding-left: 20px" class="w3-col">
                                        <span>IBC</span>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <span style="color: #AEAEAE;cursor:default">{{dataDetail.ibc.ou}}</span>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <div class="homeAway" :class="ibc.odds_over">
                                            <span style="cursor:default">{{dataDetail.ibc.odds_over}}</span>
                                            <img :class="ibc.odds_over|setArrow">
                                        </div>
                                    </div>
                                    <div style="width: 25%" class="w3-col">
                                        <div class="homeAway" :class="ibc.odds_under">
                                            <span style="cursor:default">{{dataDetail.ibc.odds_under}}</span>
                                            <img :class="ibc.odds_under|setArrow">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`,
    data: function () {
        return {
            dataDetail: {
                ibc: {},
                sbo: {},
                sys: {},
            },
            sys: {},
            ibc: {},
            sbo: {}

        };
    },
    methods: {
        setDataDetail: function (val) {

            this.dataDetail = val;
        },
        setBackground: function (val, objname) {
            switch (objname) {
                case 'sys':
                    this.sys = val;
                    break;
                case 'sbo':
                    this.sbo = val;
                    break;
                case 'ibc':
                    this.ibc = val;
                    break;
            }

        },
        getObjectDiff: function (old, current, diff) {
            diff = {};
            let self = this;
            $.each([old, current], function (index, obj) {
                for (prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        if (typeof obj[prop] === "object" && obj[prop] !== null) {
                            diff[prop] = self.getObjectDiff(old[prop], current[prop], diff);
                        }
                        else {
                            if (old === undefined) old = {};
                            if (current === undefined) current = {};
                            if (old[prop] !== current[prop]) {
                                diff[prop] = [old[prop], current[prop]];
                            }
                        }
                    }
                }
            });
            return diff;
        }
    },
    filters: {
        setArrow: function (val) {
            let arrwow = '';
            if (val == 'bg-up') {
                arrwow = 'arrow-up';
                setTimeout(function () {
                    $('.homeAway').removeClass('bg-up');
                }, 5000)
            } else {
                arrwow = 'arrow-down';
                setTimeout(function () {
                    $('.homeAway').removeClass('bg-down');
                }, 5000)
            }
            return arrwow;
        }
    },
    watch: {
        'dataDetail': function (newVal, oldVal) {
            //check data first show
            if (!($.isEmptyObject(oldVal.ibc) && $.isEmptyObject(oldVal.sbo) && $.isEmptyObject(oldVal.sys))) {
                if (!(JSON.stringify(oldVal) === JSON.stringify(newVal))) {
                    if (oldVal.match_code == newVal.match_code) {
                        var diff = this.getObjectDiff(newVal, oldVal);
                        var keyValue = Object.keys(diff);
                        for (let i = 0; i < keyValue.length; i++) {
                            if (keyValue[i] == 'sys' || keyValue[i] == 'ibc' || keyValue[i] == 'sbo') {
                                let subKeyValue = Object.keys(diff[keyValue[i]]);
                                let newdata = {};
                                for (let j = 0; j < subKeyValue.length; j++) {
                                    let data = diff[keyValue[i]][subKeyValue[j]];
                                    if (parseFloat(data[0]) > parseFloat(data[1])) {
                                        newdata[subKeyValue[j]] = 'bg-up';
                                    } else {
                                        newdata[subKeyValue[j]] = 'bg-down';
                                    }
                                }
                                this.setBackground(newdata, keyValue[i]);
                            }
                        }
                    }
                }
            }
        }
    },
    created(){
        let self = this;
        Event.listen('predictionDetail', function (v) {
            self.setDataDetail(v);
        })
    }
});
Vue.component('sub-component',{
    template: `
    <div class="ip-RHSMediaView ipe-RHSMediaView " style="height: auto;margin:0 auto;background-color: #545454;">
                        <div class="ipe-RHSMediaView_MediaWrapper " style="width:320px;margin:auto">
                            <div class="ip-MatchLiveContainer" style="width:320px;background-color:#404040">
                                <div class="EventViewTitle" style="display: none;">
                                    <span class="Text">Home v Away</span>
                                    <!--<select class="flag" onchange="OnClickLanguage(this.value);" style="padding:0px;margin-top:5px;">
                                        <option class="styled-button-language" selected="selected" value="1">EN</option>
                                        <option class="flag flag-cn" value="2"></option>
                                        <option class="styled-button-language" value="3">ไทย</option>
                                        <option class="styled-button-language" value="4">tiếng Việt</option>
                                        <option class="styled-button-language" value="5">Indonesia</option>
                                        <option class="styled-button-language" value="6">한국어</option>
                                        <option class="styled-button-language" value="7">日本語</option>
                                    </select>-->
                                    <!--<span class="language">
                                        <button onclick="OnClickLanguage(1);" class="styled-button-language">EN</button>
                                        <button onclick="OnClickLanguage(2);" class="styled-button-language">中文</button>
                                    </span>-->
                                    <!--<span class="language"><a href="javascript:void(0);" onclick="OnClickLanguage(2);">中文</a> | <a href="javascript:void(0);" onclick="OnClickLanguage(1);">English</a></span>-->
                                </div>
                                <div>
                                    <div class="ml1-MatchLiveSoccerModule ">
                                        <div></div>
                                        <div class="ml1-ScoreHeader" style="width:320px">
                                            <div class="ml1-ScoreHeader_Team ml1-ScoreHeader_Team1" style="width:157px">
                                                <div class="ml1-ScoreHeader_Contents ml1-ScoreHeader_Contents1 ">
                                                    <div class="ml1-ScoreHeader_TeamName ml1-ScoreHeader_Team1Name ">
                                                        <div class="ml1-ScoreHeader_ColorBar " style="color: rgb(0, 175, 240);"></div>
                                                        <div class="ml1-ScoreHeader_TruncateName " id="team1Name" style="font-size:12px">{{msg[8]}}</div>
                                                    </div>
                                                    <div class="ml1-ScoreHeader_ScoreWrapper ml1-ScoreHeader_Team1ScoreWrapper ">
                                                        <div class="ml1-ScoreHeader_Score ml1-ScoreHeader_Team1Score " id="team1score">{{msg[12]}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="ml1-ScoreHeader_Team ml1-ScoreHeader_Team2 " style="width:142px">
                                                <div class="ml1-ScoreHeader_Contents ml1-ScoreHeader_Contents2 ">
                                                    <div class="ml1-ScoreHeader_ScoreWrapper ml1-ScoreHeader_Team2ScoreWrapper ">
                                                        <div class="ml1-ScoreHeader_Score ml1-ScoreHeader_Team2Score " id="team2score">{{msg[13]}}</div>
                                                    </div>
                                                    <div class="ml1-ScoreHeader_TeamName ml1-ScoreHeader_Team2Name ">
                                                        <div class="ml1-ScoreHeader_TruncateName " id="team2Name" style="font-size:12px">{{msg[9]}}</div>
                                                        <div class="ml1-ScoreHeader_ColorBar " style="color: rgb(255, 255, 255);"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="ml1-ScoreHeader_Timer "><span class="ml1-ScoreHeader_AdditionalText ml1-ScoreHeader_TextFadeOut "></span><span id="ml1-ScoreHeader_Clock" class="ml1-ScoreHeader_Clock " style="color:#fff">00:00</span><span class="ml1-ScoreHeader_InjuryTime ml1-ScoreHeader_InjuryTimeFadeOut "></span></div>
                                        </div>
                                        <div class="ml1-MatchliveSoccerModule_Wrapper" style="width:320px">
                                            <div class="ml1-MatchLiveSoccerModule_Constrainer ml1-SwipeContainer_Child ml1-SwipeContainer_ViewIndex-0 ">
                                                <div class="ml1-MatchLiveSoccerModule_MatchLiveWrapper ">
                                                    <div class="ml1-MatchLiveSoccerModule_PitchContainer" style="width:303px;">
                                                        <div class="ml1-MatchLiveSoccerModule_SVGPitchContainer ">
                                                            <svg class="ml1-SoccerPitch_SVG" xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                <defs>
                                                                    <!-- This is where the colours get pumped when the possession changes -->
                                                                    <linearGradient id="ml1-Gradient1">
                                                                        <stop class="gradStart" offset="60%" style="stop-opacity: 0.54; stop-color: rgb(24, 84, 53);"></stop>
                                                                        <stop class="gradEnd" offset="100%" style="stop-opacity: 0.54; stop-color: rgb(24, 84, 53);"></stop>
                                                                    </linearGradient>
                                                                    <linearGradient id="ml1-Gradient2">
                                                                        <stop class="gradStart" offset="0%" style="stop-opacity: 0.54; stop-color: rgb(24, 57, 36);"></stop>
                                                                        <stop class="gradEnd" offset="73.2%" style="stop-opacity: 0.54; stop-color: rgb(24, 84, 53);"></stop>
                                                                    </linearGradient>
                                                                    <linearGradient id="ml1-SolidTeamColour">
                                                                        <stop id="ml1-SolidTeam1" offset="0%" stop-color="#FFDF1B"></stop>
                                                                        <stop id="ml1-SolidTeam2" offset="100%" stop-color="#FFDF1B"></stop>
                                                                    </linearGradient>
                                                                </defs>
                                                                <g id="pitch" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                    <path fill="#222" d="M0 0h400v180h-400z"></path>
                                                                    <rect id="pitch-BG" fill="#2C7836" x="0" y="0" width="400" height="180"></rect>
                                                                    <rect id="18-yard-away" stroke="#3A8943" stroke-width="2" x="348" y="44" width="51" height="93"></rect>
                                                                    <rect id="18-yard-home" stroke="#3A8943" stroke-width="2" x="1" y="44" width="51" height="93"></rect>
                                                                    <path d="M199,3 L199,178 L199,179 L201,179 L201,178 L201,3 L201,2 L199,2 L199,3 L199,3 Z" id="Shape" fill="#3A8943"></path>
                                                                    <path d="M200,118 L200,118 C215.463973,118 228,105.463973 228,90 C228,74.536027 215.463973,62 200,62 C184.536027,62 172,74.536027 172,90 C172,105.463973 184.536027,118 200,118 L200,118 Z M200,120 L200,120 C183.431458,120 170,106.568542 170,90 C170,73.4314575 183.431458,60 200,60 C216.568542,60 230,73.4314575 230,90 C230,106.568542 216.568542,120 200,120 L200,120 Z" id="Shape-Copy" fill="#3A8943"></path>
                                                                    <circle id="Oval-344" fill="#3A8943" cx="200" cy="90" r="6"></circle>
                                                                    <path d="M74,63 C65.5522257,68.9666814 60,79.0570309 60,90.5 C60,101.942969 65.5522257,112.033319 74,118" id="d-left" stroke="#3A8943" stroke-width="2" transform="translate(67.000000, 90.500000) scale(-1, 1) translate(-59.000000, -90.500000) "></path>
                                                                    <circle id="Oval-70" fill="#3A8943" cx="34" cy="90" r="3"></circle>
                                                                    <path d="M1,11 C6.5228475,11 11,6.5228475 11,1 L9.046875,1 C9.046875,5.44416635 5.44416635,9.046875 1,9.046875 L1,11 L1,11 Z" id="Shape" fill="#3A8943"></path>
                                                                    <path d="M1,171 C5.418278,171 9,174.581722 9,179 L11,179 C11,173.477153 6.5228475,169 1,169 L1,171 L1,171 Z" id="Shape" fill="#3A8943"></path>
                                                                    <path d="M337.884236,62 C328.64831,68.2472191 323,78.6467666 323,90 C323,101.353233 328.64831,111.752781 337.884236,118 L339,116.354082 C330.305144,110.472845 324.989964,100.686649 324.989964,90 C324.989964,79.3133507 330.305144,69.5271551 339,63.645918 L337.884236,62 L337.884236,62 Z" transform="translate(9,0)" id="Shape-Copy-2" fill="#3A8943"></path>
                                                                    <rect id="6-yard-home" stroke="#3A8943" stroke-width="2" x="1" y="69" width="16" height="41"></rect>
                                                                    <path d="M399,69 L383,69 L383,110 L399,110 L399,69 L399,69 Z" id="6-yard-away" stroke="#3A8943" stroke-width="2" sketch:type="MSShapeGroup"></path>
                                                                    <circle id="Oval-70" fill="#3A8943" cx="365" cy="90" r="3"></circle>
                                                                    <path d="M399,9.046875 C394.555834,9.046875 390.953125,5.44416635 390.953125,1 L389,1 C389,6.5228475 393.477153,11 399,11 L399,9.046875 L399,9.046875 Z" id="Shape" fill="#3A8943"></path>
                                                                    <path d="M399,169 C393.477153,169 389,173.477153 389,179 L391,179 C391,174.581722 394.581722,171 399,171 L399,169 L399,169 Z" id="Shape" fill="#3A8943"></path>
                                                                    <rect stroke="#3A8943" stroke-width="2" x="1" y="1" width="398" height="178"></rect>
                                                                </g>
                                                                <path id="ml1-Possession1" style="opacity: 0;" d="M2,2 199.1,2 199.1,2 C199.1,1.4 199.1,28 199.1,28 C199.1,29 199.1,30 199.1,31 L199.1,61 L199.1,88 C199.1,89 199.1,90 199.1,91 L199.1,121 L199.1,146 C199.1,147 199.1,150 199.1,151 L199.1,178 C199.1,178 2.0,178 2.0,178 L2,2 Z" fill="url(#ml1-Gradient1)" class=""></path>
                                                                <path id="ml1-Possession2" style="opacity: 0;" d="M398,2 114.3585950413223,2 113.64628099173552,2 C113.64628099173552,1 100.11231404958677,28 100.11231404958677,28 C99.39999999999999,29 99.39999999999999,30 100.11231404958677,31 L113.64628099173552,61 L100.11231404958677,88 C99.39999999999999,89 99.39999999999999,90 100.11231404958677,91 L113.64628099173552,121 L100.11231404958677,146 C99.39999999999999,147 99.39999999999999,150 99.39999999999999,151 L113.64628099173552,178 C113.64628099173552,178 398.0,178 398.0,178 L398,2 Z" fill="url(#ml1-Gradient2)" class="" opacity="1"></path>
                                                                <g id="ml1-WideKickRadial" opacity="0">
                                                                    <path id="ml1-WideKickRadialOuter" fill="#165031" d="M94.703,73.698C110.554,53.359,120,27.784,120,0c0-27.764-9.433-53.321-25.262-73.653L0,0.036L94.703,73.698z"></path>
                                                                    <path id="ml1-WideKickRadialCentre" fill="#165031" d="M62.325,48.514C72.765,35.123,79,18.294,79,0c0-18.274-6.222-35.085-16.639-48.469L0,0.036L62.325,48.514z"></path>
                                                                    <path id="ml1-WideKickRadialInner" fill="#165031" d="M30.759,23.961C35.918,17.349,39,9.037,39,0c0-9.017-3.068-17.311-8.205-23.917L0,0.036L30.759,23.961z"></path>
                                                                </g>
                                                                <g id="ml1-NarrowKickRadial" opacity="0" transform="translate(92, 129.6) rotate(-155.44657691657048)">
                                                                    <path id="ml1-NarrowKickRadialOuter" fill="#165031" d="M0.031,0.013l117.647,45.045C123.041,31.064,126,15.881,126,0s-2.959-31.065-8.322-45.059L0.093-0.036L0.031,0.013z" class="" style="opacity: 0; transform: scaleX(0) scaleY(0);"></path>
                                                                    <path id="ml1-NarrowKickRadialCentre" fill="#165031" d="M0.031,0.013l77.43,29.647c3.536-9.21,5.488-19.204,5.488-29.66s-1.952-20.45-5.487-29.66L0.093-0.036L0.031,0.013z" class="" style="opacity: 0; transform: scaleX(0) scaleY(0);"></path>
                                                                    <path id="ml1-NarrowKickRadialInner" fill="#165031" d="M0.031,0.013l38.208,14.629c1.746-4.546,2.71-9.48,2.71-14.642s-0.964-10.096-2.709-14.642L0.093-0.036L0.031,0.013z" class="" style="opacity: 0; transform: scaleX(0) scaleY(0);"></path>
                                                                </g>
                                                                <g id="ml1-ThrowRadial" opacity="0" transform="translate(92, 180) rotate(-19.230672375661285)">
                                                                    <path id="ml1-ThrowRadialOuter" fill="#165031" d="M53.033,53.068c29.289-29.289,29.289-76.777,0-106.066L0,0.035L53.033,53.068z" class="" style="opacity: 0; transform: scaleX(0) scaleY(0);"></path>
                                                                    <path id="ml1-ThrowRadialInner" fill="#165031" d="M26.517,26.552c14.646-14.645,14.644-38.39,0-53.033L0,0.035L26.517,26.552z" class="" style="opacity: 0; transform: scaleX(0) scaleY(0);"></path>
                                                                </g></svg></div>
                                                        <div class="ml-MatchLiveSoccerModule_AnimWrapper ">
                                                            <div class="ml1-AnimatedTextBar ">
                                                                <div class="ml1-Anims_Asset ml1-Anims_H1TextWrapper" style="opacity: 0; display: block; text-align: left; left: 148px; top: 70.5px; width: 180px;"><span class="ml1-Anims_H1Text ">Aswan FC</span></div>
                                                                <div class="ml1-Anims_Asset ml1-Anims_H1TextBackupWrapper" style="opacity: 0; display: block; top: 120.5px; width: 180px; text-align: right; left: 6px;"><span class="ml1-Anims_H1TextBackup ">Al Ittihad Al Sakandary</span></div>
                                                                <div class="ml1-Anims_Asset ml1-Anims_H1TextGhostWrapper " style="display: none; width: 180px; text-align: left;"><span class="ml1-Anims_H1TextGhost ">Aswan FC</span></div>
                                                                <div class="ml1-Anims_Asset ml1-Anims_H2TextWrapper" style="opacity: 0; display: block; text-align: left; left: 148px; top: 89px; width: 180px;"><span class="ml1-Anims_H2Text ">Attack</span></div>
                                                                <div class="ml1-Anims_Asset ml1-Anims_H2TextBackupWrapper" style="opacity: 0; display: block; top: 89px; width: 180px; text-align: left; left: 80px;"><span class="ml1-Anims_H2TextBackup ">Dangerous Attack</span></div>
                                                                <div class="ml1-Anims_Asset ml1-Anims_H2TextGhostWrapper " style="display: none; width: 180px; text-align: left;"><span class="ml1-Anims_H2TextGhost ">Attack</span></div>
                                                                <div class="ml1-Anims_Asset ml1-Anims_H3TextWrapper" style="display: none; opacity: 0;"><span class="ml1-Anims_H3Text "></span></div>
                                                                <div class="ml1-Anims_Asset ml1-Anims_H3TextBackupWrapper " style="display: none;"><span class="ml1-Anims_H3TextBackup "></span></div>
                                                                <div class="ml1-Anims_Asset ml1-Anims_H3TextGhostWrapper " style="display: none;"><span class="ml1-Anims_H3TextGhost "></span></div>
                                                                <div class="ml1-Anims_Line" style="opacity: 0; left: 140px; top: 72px; height: 36px; transform: rotateZ(180deg); background-color: rgb(0, 70, 168);"></div>
                                                            </div>
                                                            <div class="ml1-Blob " style="opacity: 0; color: rgb(252, 126, 0); top: 2%; left: 99%;">
                                                                <div class="ml1-Blob_Inner1 "></div>
                                                                <div class="ml1-Blob_Inner2 "></div>
                                                                <div class="ml1-Blob_Inner3 "></div>
                                                            </div>
                                                            <div id="ml1-Anims-Extra"><div class="ml1-Anims_Asset ml1-Anims_Icon ml1-Anims_Offside "></div></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="ml1-SwipeContainer_Child ml1-SwipeContainer_ViewIndex-0 ml1-TabController ">
                                                <div>
                                                    <div class="ml1-AllStats" style="margin-left:-10px">
                                                        <div class="ml1-StatsUpper " style="margin-top:0px;margin-left:12px">
                                                            <div id="stat3" class="ml1-StatsWheel ">
                                                                <span class="ml1-StatsWheel_Text title">ATTACKS</span>
                                                                <div class="ml1-StatsWheelContainer ">
                                                                    <div class="ml1-StatsWheel_Team1Text team1Amt">0</div>
                                                                    <div class="ml1-StatsWheelSvg_Container ">
                                                                        <svg class="ml1-StatsWheelSvg" width="32" height="32" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                                <path id="wheelPathTeam1" class="ml1-StatsWheelSvg_TeamOnePath" stroke-width="5" d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z" stroke="#8B572A" style="stroke: rgb(0, 175, 240);"></path>
                                                                                <path id="wheelShadow" class="ml1-StatsWheelSvg_WheelShadow" stroke-width="5" d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z" stroke="#404040" transform="rotate(2.291510716631791 16 16)" style="stroke-dasharray: 78.5508px, 78.5508px; stroke-dashoffset: 38.2754px;"></path>
                                                                                <path id="wheelPathTeam2" class="ml1-StatsWheelSvg_TeamTwoPath" stroke-width="5" d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z" stroke="#F8E81C" transform="rotate(-2.291510716631791 16 16)" style="stroke: rgb(255, 255, 255); stroke-dasharray: 78.5508px, 78.5508px; stroke-dashoffset: 40.2754px;"></path>
                                                                            </g></svg></div>
                                                                    <div class="ml1-StatsWheel_Team2Text team2Amt">0</div>
                                                                </div>
                                                            </div>
                                                            <div id="stat4" class="ml1-StatsWheel ">
                                                                <span class="ml1-StatsWheel_Text title">DANGEROUS ATTACKS</span>
                                                                <div class="ml1-StatsWheelContainer ">
                                                                    <div class="ml1-StatsWheel_Team1Text team1Amt">0</div>
                                                                    <div class="ml1-StatsWheelSvg_Container ">
                                                                        <svg class="ml1-StatsWheelSvg" width="32" height="32" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                                <path id="wheelPathTeam1" class="ml1-StatsWheelSvg_TeamOnePath" stroke-width="5" d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z" stroke="#8B572A" style="stroke: rgb(0, 175, 240);"></path>
                                                                                <path id="wheelShadow" class="ml1-StatsWheelSvg_WheelShadow" stroke-width="5" d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z" stroke="#404040" transform="rotate(2.291510716631791 16 16)" style="stroke-dasharray: 78.5508px, 78.5508px; stroke-dashoffset: 38.2754px;"></path>
                                                                                <path id="wheelPathTeam2" class="ml1-StatsWheelSvg_TeamTwoPath" stroke-width="5" d="M16,28.5c6.904,0,12.5-5.597,12.5-12.5c0-6.904-5.596-12.5-12.5-12.5C9.098,3.5,3.5,9.096,3.5,16C3.5,22.903,9.098,28.5,16,28.5z" stroke="#F8E81C" transform="rotate(-2.291510716631791 16 16)" style="stroke: rgb(255, 255, 255); stroke-dasharray: 78.5508px, 78.5508px; stroke-dashoffset: 40.2754px;"></path>
                                                                            </g></svg></div>
                                                                    <div class="ml1-StatsWheel_Team2Text team2Amt">0</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="ml1-StatsLower " style="width:320px;margin-left:-11px">
                                                            <div class="ml1-StatsLower_MiniHomeWrapper ">
                                                                <div class="ml1-StatsLower_Home ml1-StatsLower_StatsWrapper ">
                                                                    <div id="team1IconStats" class="ml1-StatsLower_AllCards ">
                                                                        <div class="ml1-StatsColumn_MiniCornerWrapper " style="color: rgb(0, 175, 240);">
                                                                            <div class="ml1-StatsColumn_MiniCorner"></div>
                                                                            <div class="ml1-StatsColumn_MiniValue corners">0</div>
                                                                        </div>
                                                                        <div class="ml1-StatsColumn_MiniCardWrapper ">
                                                                            <div class="ml1-StatsColumn_MiniRedCard "></div>
                                                                            <div class="ml1-StatsColumn_MiniValue card red">0</div>
                                                                        </div>
                                                                        <div class="ml1-StatsColumn_MiniCardWrapper ">
                                                                            <div class="ml1-StatsColumn_MiniYellowCard "></div>
                                                                            <div class="ml1-StatsColumn_MiniValue card yellow">0</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="ml1-StatsLower_MiniBarsCollection ">
                                                                <div class="ml1-StatsLower_MiniBarWrapper ">
                                                                    <div id="stat1">
                                                                        <h4 class="ml1-StatsBar_MiniHeader title" style="font-size:12px">SHOTS ON TARGET</h4>
                                                                        <div class="ml1-StatsBar_MiniBar ">
                                                                            <b class="ml1-StatsBar_MiniBarValue ml1-StatsBar_MiniBarValue-1 team1Amt">0</b>
                                                                            <div class="ml1-StatsBar_MiniBarSurround " style="color: rgb(255, 255, 255);">
                                                                                <span class="ml1-StatsBar_MiniBarFill " style="border-top-right-radius: 0px; border-bottom-right-radius: 0px; color: rgb(0, 175, 240);"></span>
                                                                            </div>
                                                                            <b class="ml1-StatsBar_MiniBarValue ml1-StatsBar_MiniBarValue-2 team2Amt">0</b>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="ml1-StatsLower_MiniBarWrapper ">
                                                                    <div id="stat2">
                                                                        <h4 class="ml1-StatsBar_MiniHeader title" style="font-size:12px">SHOTS OFF TARGET</h4>
                                                                        <div class="ml1-StatsBar_MiniBar ">
                                                                            <b class="ml1-StatsBar_MiniBarValue ml1-StatsBar_MiniBarValue-1 team1Amt">0</b>
                                                                            <div class="ml1-StatsBar_MiniBarSurround " style="color: rgb(255, 255, 255);">
                                                                                <span class="ml1-StatsBar_MiniBarFill " style="border-top-right-radius: 0px; border-bottom-right-radius: 0px; color: rgb(0, 175, 240);"></span>
                                                                            </div>
                                                                            <b class="ml1-StatsBar_MiniBarValue ml1-StatsBar_MiniBarValue-2 team2Amt">0</b>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="ml1-StatsLower_MiniAwayWrapper ">
                                                                <div class="ml1-StatsLower_StatsWrapper ml1-StatsLower_Away ">
                                                                    <div id="team2IconStats" class="ml1-StatsLower_AllCards ">
                                                                        <div class="ml1-StatsColumn_MiniCornerWrapper " style="color: rgb(255, 255, 255);">
                                                                            <div class="ml1-StatsColumn_MiniCorner"></div>
                                                                            <div class="ml1-StatsColumn_MiniValue corners">0</div>
                                                                        </div>
                                                                        <div class="ml1-StatsColumn_MiniCardWrapper ">
                                                                            <div class="ml1-StatsColumn_MiniRedCard "></div>
                                                                            <div class="ml1-StatsColumn_MiniValue card red">0</div>
                                                                        </div>
                                                                        <div class="ml1-StatsColumn_MiniCardWrapper ">
                                                                            <div class="ml1-StatsColumn_MiniYellowCard "></div>
                                                                            <div class="ml1-StatsColumn_MiniValue card yellow">0</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="ml1-AllStats_Divider "></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ipe-RHSMediaView_MLSpiner ">
                                <div class="ipe-RHSMediaView_Img "></div>
                            </div>
                        </div>
                        <div class="LineUpContainer match-live "><span id="cpLineupIconT1" style="display: block;"></span></div>
                        <div class="LineUpContainer match-live "><span id="cpLineupIconT2" style="display: block;"></span></div>
                        <div id="MatchStatsPopUpBox">
                            <div class="StatsSelectIcon StatsContainerButton Hidden "></div>
                        </div>
                        <div class="noStats" style="display: none;"><div><span style="font-weight: bold;">Disclaimer: </span><span data-balloon-length="large" data-balloon="Note: Minimum requirement Chrome 4.0, IE 9.0, Firefox/Mozilla 2.0, Safari 3.1, Opera 9.0. And all HTML5 supported browser including smart phone browser." data-balloon-pos="right">⚠</span><br>The information shown on this page is for reference only. We will not be held responsible for accuracy, error or mistake found on this page.</div></div>
                    </div>`,
    props:['msg'],
});
Vue.component('livescoredetail', {
    template: `<div id="windowLiveScoresDetail" class="w3-animate-right" style="display: none;">
                        <div class="w3-row headerDetailLiveStream"
                             style="background-color: #fff;height: 50px;width: 100%">
                            <div class="w3-col" style="width: 50%;">
                                <button style="padding-top: 14px;border: none;background-color: #fff;cursor: pointer;outline: none"
                                        onclick="closeWindowLiveScoresDetail('windowLiveScoresDetail')">
                                    <div style="float: left;margin-right: 10px">
                                        <i class="material-icons" style="color: #577DBB;">keyboard_backspace</i>
                                    </div>

                                    <div style="float: left">
                                        <span style="color: #577DBB;font-size: 14px">BACK</span>
                                    </div>
                                </button>
                            </div>
                            <div class="w3-col"
                                 style="width: 50%;text-align: right;padding-right: 20px;padding-top: 14px">
                                <i class="material-icons" style="color: #577DBB;cursor: pointer"
                                   onclick="openNotification('openNewTab');">open_in_new</i>
                            </div>
                        </div>
                        <div class="w3-row" style="padding: 5px 10px 5px 0px;background-color: #fff">
                            <div class="w3-row" style="color: black;padding-bottom: 7px;padding-top: 7px">
                                <div class="w3-col liveScoreText" style="width:20%;padding-left: 27px;font-size:12px;color: #36CC64">
                                    {{dataDetail[4]|setTimeLive}}
                                </div>
                                <div class="w3-col" style="width:70%;color: #38619E">{{dataDetail[8]}}</div>
                                <div class="w3-col"style="width:10%;text-align: right;padding-right: 10px;color: #38619E;">
                                    {{dataDetail[12]}}
                                </div>
                            </div>
                            <div class="w3-row" style="color: black;">
                                <div class="w3-col" style="width:20%;padding-left: 22px;color: #36CC64;font-size:12px;">
                                    LIVE
                                </div>
                                <div class="w3-col liveScoreText" style="width:70%;color: #38619E">{{dataDetail[9]}}</div>
                                <div class="w3-col liveScoreText" style="width:10%;text-align: right;padding-right: 10px;color: #38619E;">
                                    {{dataDetail[13]}}
                                </div>
                            </div>
                        </div>
                    <div class="liveStreamDetail">
                        <div class="w3-row"
                             style="background-color: #fff;border-top: 1px solid #EBEBEB;padding-left: 22px;padding-right: 22px;padding-top: 10px">
                            <div class="w3-row" style="height: 35px">
                                <div class="w3-col" style="width: 50%;color: #C5C5C5"><span>Kickoff</span></div>
                                <div class="w3-col" style="width: 50%;text-align: right;color:#616161">
                                    <span>{{dataDetail[10]|setMatchDate}}</span></div>
                            </div>
                            <div class="w3-row" style="height: 35px">
                                <div class="w3-col" style="width: 50%;color: #C5C5C5"><span>League</span></div>
                                <div class="w3-col" style="width: 50%;text-align: right;color:#616161 ">
                                    <span>{{dataDetail[5]}}</span></div>
                            </div>
                        </div>
                        <div class="w3-row headerLiveScoresDetail" v-show="dataStats.length>0" style="text-align: center;text-shadow:rgba(0,0,0,0.54) 1px 1px 4px;color: #fff;height: 53px">
                            <div class="w3-col"
                                 style="width: 25%;font-size: 12px;text-align: left;padding-left: 20px;padding-top: 19px">
                                <span>HOME</span></div>
                            <div class="w3-col" style="width: 50%;font-size: 16px;font-weight: 600;padding-top: 15px">
                                <span>STATS</span></div>
                            <div class="w3-col"
                                 style="width: 25%;text-align: right;padding-right: 20px;font-size: 12px;padding-top: 19px">
                                <span>AWAY</span></div>
                        </div>
                        <div id="statsDetail" v-show="dataStats.length>0">
                            <ul>
                                <li>
                                    <div class="w3-row">
                                        <div class="w3-col"
                                             style="width:5%;color: #616161;line-height: 3;padding-left: 10px;">
                                            <span>{{setStats(dataStats[6],'home')}}</span></div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawLeftLine" :style="{width:setWidthStat(setStats(dataStats[6],'home'))}">
                                        </div>
                                        <div class="w3-col" style="width:20%;color:#C5C5C5;line-height: 3;text-align: center;font-size:14px">
                                            Shots
                                        </div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawRightLine" :style="{width:setWidthStat(setStats(dataStats[6],'away'))}">
                                        </div>
                                        <div class="w3-col" style="width:5%;text-align: right;color: #616161;line-height: 3;padding-right: 10px;">
                                            {{setStats(dataStats[6],'away')}}
                                        </div>
                                    </div>
                                </li>
                                <!--<li>
                                    <div class="w3-row">
                                        <div class="w3-col"
                                             style="width:5%;color: #616161;line-height: 3;padding-left: 10px;">
                                            <span>15</span></div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawLeftLine" width="80%">
                                        </div>
                                        <div class="w3-col"
                                             style="width:20%;color:#C5C5C5;line-height: 3;text-align: center;font-size:14px">
                                            On
                                            Target
                                        </div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawRightLine" width="15%">
                                        </div>
                                        <div class="w3-col"
                                             style="width:5%;text-align: right;color: #616161;line-height: 3;padding-right: 10px;">
                                            21
                                        </div>
                                    </div>
                                </li>-->
                                <li>
                                    <div class="w3-row">
                                        <div class="w3-col"
                                             style="width:5%;color: #616161;line-height: 3;padding-left: 10px;">
                                            <span> {{setStats(dataStats[37],'home')}}</span></div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawLeftLine" :style="{width:setWidthStat(setStats(dataStats[37],'home'))}">
                                        </div>
                                        <div class="w3-col"
                                             style="width:20%;color:#C5C5C5;line-height: 3;text-align: center;font-size:14px">
                                            Off
                                            Target
                                        </div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawRightLine" :style="{width:setWidthStat(setStats(dataStats[37],'away'))}">
                                        </div>
                                        <div class="w3-col" style="width:5%;text-align: right;color: #616161;line-height: 3;padding-right: 10px;">
                                             {{setStats(dataStats[37],'away')}}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="w3-row">
                                        <div class="w3-col"
                                             style="width:5%;color: #616161;line-height: 3;padding-left: 10px;">
                                            <span>{{setStats(dataStats[9],'home')}}</span></div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawLeftLine" :style="{width:setWidthStat(setStats(dataStats[9],'home'))}">
                                        </div>
                                        <div class="w3-col"
                                             style="width:20%;color:#C5C5C5;line-height: 3;text-align: center;font-size:14px">
                                            Corner
                                            Kicks
                                        </div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawRightLine" :style="{width:setWidthStat(setStats(dataStats[9],'away'))}">
                                        </div>
                                        <div class="w3-col" style="width:5%;text-align: right;color: #616161;line-height: 3;padding-right: 10px;">
                                            {{setStats(dataStats[9],'away')}}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="w3-row">
                                        <div class="w3-col"
                                             style="width:5%;color: #616161;line-height: 3;padding-left: 10px;">
                                            <span> {{setStats(dataStats[14],'home')}}</span></div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawLeftLine" :style="{width:setWidthStat(setStats(dataStats[14],'home'))}">
                                        </div>
                                        <div class="w3-col"
                                             style="width:20%;color:#C5C5C5;line-height: 3;text-align: center;font-size:14px">
                                            Yellow
                                            Cards
                                        </div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawRightLine" :style="{width:setWidthStat(setStats(dataStats[14],'away'))}">
                                        </div>
                                        <div class="w3-col" style="width:5%;text-align: right;color: #616161;line-height: 3;padding-right: 10px;">
                                             {{setStats(dataStats[14],'away')}}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="w3-row">
                                        <div class="w3-col"
                                             style="width:5%;color: #616161;line-height: 3;padding-left: 10px;">
                                            <span>{{setStats(dataStats[16],'home')}}</span></div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawLeftLine" :style="{width:setWidthStat(setStats(dataStats[16],'home'))}">
                                        </div>
                                        <div class="w3-col"
                                             style="width:20%;color:#C5C5C5;line-height: 3;text-align: center;font-size:14px">
                                            Red
                                            Cards
                                        </div>
                                        <div class="w3-col statsSection" style="width:35%;">
                                            <hr class="drawRightLine" :style="{width:setWidthStat(setStats(dataStats[16],'away'))}">
                                        </div>
                                        <div class="w3-col" style="width:5%;text-align: right;color: #616161;line-height: 3;padding-right: 10px;">
                                            {{setStats(dataStats[16],'away')}}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="w3-row headerLiveScoresDetail" v-show="dataTimeLine.length>0" style="text-align: center;text-shadow:rgba(0,0,0,0.54) 1px 1px 4px;color: #fff;height: 53px">
                            <div class="w3-col"
                                 style="width: 25%;font-size: 12px;text-align: left;padding-left: 20px;padding-top: 19px">
                                <span>HOME</span></div>
                            <div class="w3-col" style="width: 50%;font-size: 16px;font-weight: 600;padding-top: 15px">
                                <span>TIMELINE</span></div>
                            <div class="w3-col"
                                 style="width: 25%;text-align: right;padding-right: 20px;font-size: 12px;padding-top: 19px">
                                <span>AWAY</span></div>
                        </div>
                        <div id="timeLineDetail">
                            <ul>
                                <li v-for="item in dataTimeLine">
                                    <div class="w3-row">
                                        <div class="w3-col"
                                             style="width:10%;color: #616161;line-height: 3;padding-left: 10px;">
                                            <img :src="item[4]|setIconTimeLine('home',item[3])" width="10"></div>
                                        <div class="w3-col" style="width:35%;padding-top: 15px">
                                            <span>{{item[6]|showHidePlayerTimeLine('home',item[3])}}</span>
                                        </div>
                                        <div class="w3-col" style="width:10%;color:#C5C5C5;padding-top: 15px;text-align: center">
                                        {{item[5]+"'"}}
                                        </div>
                                        <div class="w3-col" style="width:35%;text-align: right;padding-top: 15px">
                                        <span>{{item[6]|showHidePlayerTimeLine('away',item[3])}}</span>
                                        </div>
                                        <div class="w3-col"
                                             style="width:10%;text-align: right;color: #616161;padding-top: 15px;padding-right: 10px;">
                                             <img :src="item[4]|setIconTimeLine('away',item[3])" width="10">
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                        <div class="w3-row headerLiveScoresDetail"
                             style="text-align: center;text-shadow:rgba(0,0,0,0.54) 1px 1px 4px;color: #fff;height: 53px">
                            <div class="w3-col" style="width: 100%;font-size: 16px;font-weight: 600;padding-top: 15px">
                                <span>LIVESTREAM</span></div>
                        </div>
                        <div style="text-align: center;">
                            <!--<iframe src="http://realtime.inplay.club/livecenter/match.html?display=mini&c=M8#1" width="100%" height="320px" scrolling="no" frameborder="0"/>-->
                            <slot :msg="dataDetail"></slot>
                        </div>
                        <!--
                        <div class="w3-row"
                             style="background-color: #fff;height: 70px;width: 100%;padding-top: 11px;padding-left: 20px;"
                             onclick="openNotification('openNewTab')">
                            <div class="w3-col" style=" width: 80%">
                                <span style="font-weight: 600;font-size: 16px;color: #616161">Watch Live Stream</span><br>
                                <span style="color: #C5C5C5">This will open in new tab</span>
                            </div>
                            <div class="w3-col"
                                 style="width: 20%;text-align: right;padding-top: 10px;padding-left: 20px">
                                <img src="Assets/play.png">
                            </div>
                        </div>
                        
                        <div style="height: 64px;position: absolute;bottom: 0;width: 100%; text-align: center;padding-top: 22px; color: #8B9EC6;background-image: url('Assets/bg_mobile_quarter@2x.png');background-size: cover;">
                            <span>Made by AMSB. All Right Reserved. &copy; 2017.</span>
                        </div>-->
                    </div>
                </div>`,
    data: function () {
        return {
            dataDetail: {},
            dataStats: {},
            dataTimeLine: {}
        };
    },

    methods: {
        setDataDetail: function (val) {
            this.dataDetail = val.data;
            this.dataStats = val.statData;
            this.dataTimeLine = val.timeLineData;
        },
        setStats: function (val, homeaway) {
            let stat = '';
            if (val != undefined) {
                switch (homeaway) {
                    case 'home':
                        stat = (val == '' ? 0 : val.split(',')[0]);
                        break;
                    case 'away':
                        stat = (val == '' ? 0 : val.split(',')[1]);
                        break
                }
            }
            return stat;
        },
        setWidthStat: function (v) {
            return (parseInt(v) * 100 / 30) + '%';
        }
    },
    filters: {
        setMatchDate:function (v) {
            let date=new Date(v);
            return date.getHours()+':'+(date.getMinutes()=='0'?'00':date.getMinutes());
        },
        setTimeLive: function (v) {
            return v == "" ? '0\'' : v;
        },
        showHidePlayerTimeLine: function (v, homeaway, number) {
            let player;
            if (homeaway == 'home') {
                if (number == 1) {
                    player = v;
                } else {
                    player = '';
                }
            } else {
                if (number == 0) {
                    player = v;
                } else {
                    player = '';
                }
            }
            return player;
        },
        setIconTimeLine: function (v, homeaway, number) {
            let iconl = '';
            if (homeaway == 'home') {
                if (number == 1) {
                    iconl = 'Assets/iconl/' + v + '.gif';
                } else {
                    iconl = '';
                }
            } else {
                if (number == 0) {
                    iconl = 'Assets/iconl/' + v + '.gif';
                } else {
                    iconl = '';
                }
            }
            return iconl;
        }
    },
    created(){
        let self = this;
        Event.listen('livescoreDetail', function (v) {
            self.setDataDetail(v);
        });
    }
})

