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

Vue.component('livescoredetail', {
    template: `<div id="windowLiveScoresDetail" class="w3-animate-right" style="display: none;overflow-x: hidden">
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
                                    '86
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
                                    <span>12:35 AM</span></div>
                            </div>
                            <div class="w3-row" style="height: 35px">
                                <div class="w3-col" style="width: 50%;color: #C5C5C5"><span>League</span></div>
                                <div class="w3-col" style="width: 50%;text-align: right;color:#616161 ">
                                    <span>{{dataDetail[5]}}</span></div>
                            </div>
                        </div>
                        <div class="w3-row headerLiveScoresDetail"
                             style="text-align: center;text-shadow:rgba(0,0,0,0.54) 1px 1px 4px;color: #fff;height: 53px">
                            <div class="w3-col"
                                 style="width: 25%;font-size: 12px;text-align: left;padding-left: 20px;padding-top: 19px">
                                <span>HOME</span></div>
                            <div class="w3-col" style="width: 50%;font-size: 16px;font-weight: 600;padding-top: 15px">
                                <span>STATS</span></div>
                            <div class="w3-col"
                                 style="width: 25%;text-align: right;padding-right: 20px;font-size: 12px;padding-top: 19px">
                                <span>AWAY</span></div>
                        </div>
                        <div id="statsDetail">
                            <ul>
                                <li>
                                    <div class="w3-row">
                                        <div class="w3-col"
                                             style="width:5%;color: #616161;line-height: 3;padding-left: 10px;">
                                            <span>27</span></div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawLeftLine" width="30%">
                                        </div>
                                        <div class="w3-col"
                                             style="width:20%;color:#C5C5C5;line-height: 3;text-align: center;font-size:14px">
                                            Shots
                                        </div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawRightLine" width="25%">
                                        </div>
                                        <div class="w3-col"
                                             style="width:5%;text-align: right;color: #616161;line-height: 3;padding-right: 10px;">
                                            24
                                        </div>
                                    </div>
                                </li>
                                <li>
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
                                </li>
                                <li>
                                    <div class="w3-row">
                                        <div class="w3-col"
                                             style="width:5%;color: #616161;line-height: 3;padding-left: 10px;">
                                            <span>12</span></div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawLeftLine" width="12%">
                                        </div>
                                        <div class="w3-col"
                                             style="width:20%;color:#C5C5C5;line-height: 3;text-align: center;font-size:14px">
                                            Off
                                            Target
                                        </div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawRightLine" width="15%">
                                        </div>
                                        <div class="w3-col"
                                             style="width:5%;text-align: right;color: #616161;line-height: 3;padding-right: 10px;">
                                            3
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="w3-row">
                                        <div class="w3-col"
                                             style="width:5%;color: #616161;line-height: 3;padding-left: 10px;">
                                            <span>3</span></div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawLeftLine" width="80%">
                                        </div>
                                        <div class="w3-col"
                                             style="width:20%;color:#C5C5C5;line-height: 3;text-align: center;font-size:14px">
                                            Corner
                                            Kicks
                                        </div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawRightLine" width="9%">
                                        </div>
                                        <div class="w3-col"
                                             style="width:5%;text-align: right;color: #616161;line-height: 3;padding-right: 10px;">
                                            -
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="w3-row">
                                        <div class="w3-col"
                                             style="width:5%;color: #616161;line-height: 3;padding-left: 10px;">
                                            <span>{{dataDetail[18]}}</span></div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawLeftLine" width="10%">
                                        </div>
                                        <div class="w3-col"
                                             style="width:20%;color:#C5C5C5;line-height: 3;text-align: center;font-size:14px">
                                            Yellow
                                            Cards
                                        </div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawRightLine" width="85%">
                                        </div>
                                        <div class="w3-col" style="width:5%;text-align: right;color: #616161;line-height: 3;padding-right: 10px;">
                                            {{dataDetail[19]}}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="w3-row">
                                        <div class="w3-col"
                                             style="width:5%;color: #616161;line-height: 3;padding-left: 10px;">
                                            <span>{{dataDetail[16]}}</span></div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawLeftLine" width="25%">
                                        </div>
                                        <div class="w3-col"
                                             style="width:20%;color:#C5C5C5;line-height: 3;text-align: center;font-size:14px">
                                            Red
                                            Cards
                                        </div>
                                        <div class="w3-col" style="width:35%;">
                                            <hr class="drawRightLine" width="9%">
                                        </div>
                                        <div class="w3-col" style="width:5%;text-align: right;color: #616161;line-height: 3;padding-right: 10px;">
                                            {{dataDetail[17]}}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="w3-row headerLiveScoresDetail"
                             style="text-align: center;text-shadow:rgba(0,0,0,0.54) 1px 1px 4px;color: #fff;height: 53px">
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
                                <li>
                                    <div class="w3-row">
                                        <div class="w3-col"
                                             style="width:10%;color: #616161;line-height: 3;padding-left: 10px;padding-top: 7px">
                                            <img src="Assets/menu_aboutus@1x.png" width="25"></div>
                                        <div class="w3-col" style="width:35%;padding-top: 15px">
                                            <span>Ricardo Quaresma</span>
                                        </div>
                                        <div class="w3-col"
                                             style="width:10%;color:#C5C5C5;padding-top: 15px;text-align: center">'86
                                        </div>
                                        <div class="w3-col" style="width:35%;text-align: right">
                                        </div>
                                        <div class="w3-col"
                                             style="width:10%;text-align: right;color: #616161;padding-top: 15px;padding-right: 10px;">
                                            <span></span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="w3-row">
                                        <div class="w3-col"
                                             style="width:10%;color: #616161;line-height: 3;padding-left: 10px;padding-top: 7px">
                                            <img src="Assets/menu_aboutus@1x.png" width="25"></div>
                                        <div class="w3-col" style="width:35%;padding-top: 15px">
                                            <span>Hector Moreno</span>
                                        </div>
                                        <div class="w3-col"
                                             style="width:10%;color:#C5C5C5;padding-top: 15px;text-align: center">'86
                                        </div>
                                        <div class="w3-col" style="width:35%;padding-top: 15px;text-align: right">
                                            <span>Javier Hernadesz</span>
                                        </div>
                                        <div class="w3-col"
                                             style="width:10%;text-align: right;color: #616161;line-height: 3;padding-right: 10px;padding-top: 7px">
                                            <img src="Assets/menu_aboutus@1x.png" width="25">
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="w3-row">
                                        <div class="w3-col"
                                             style="width:10%;color: #616161;line-height: 3;padding-left: 10px;padding-top: 7px">
                                            <img src="Assets/menu_aboutus@1x.png" width="25"></div>
                                        <div class="w3-col" style="width:35%;padding-top: 15px">
                                            <span>Hector Moreno</span>
                                        </div>
                                        <div class="w3-col"
                                             style="width:10%;color:#C5C5C5;padding-top: 15px;text-align: center">'86
                                        </div>
                                        <div class="w3-col" style="width:35%;padding-top: 15px;text-align: right">
                                            <span>Javier Hernadesz</span>
                                        </div>
                                        <div class="w3-col"
                                             style="width:10%;text-align: right;color: #616161;line-height: 3;padding-right: 10px;padding-top: 7px">
                                            <img src="Assets/menu_aboutus@1x.png" width="25">
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="w3-row">
                                        <div class="w3-col"
                                             style="width:10%;color: #616161;line-height: 3;padding-left: 10px;padding-top: 7px">
                                            <img src="Assets/menu_aboutus@1x.png" width="25"></div>
                                        <div class="w3-col" style="width:35%;padding-top: 15px">
                                            <span>Hector Moreno</span>
                                        </div>
                                        <div class="w3-col"
                                             style="width:10%;color:#C5C5C5;padding-top: 15px;text-align: center">'86
                                        </div>
                                        <div class="w3-col" style="width:35%;padding-top: 15px;text-align: right">
                                            <span>Javier Hernadesz</span>
                                        </div>
                                        <div class="w3-col"
                                             style="width:10%;text-align: right;color: #616161;line-height: 3;padding-right: 10px;padding-top: 7px">
                                            <img src="Assets/menu_aboutus@1x.png" width="25">
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="w3-row">
                                        <div class="w3-col"
                                             style="width:10%;color: #616161;line-height: 3;padding-left: 10px;padding-top: 7px">
                                            <img src="Assets/menu_aboutus@1x.png" width="25"></div>
                                        <div class="w3-col" style="width:35%;padding-top: 15px">
                                            <span>Hector Moreno</span>
                                        </div>
                                        <div class="w3-col"
                                             style="width:10%;color:#C5C5C5;padding-top: 15px;text-align: center">'86
                                        </div>
                                        <div class="w3-col" style="width:35%;padding-top: 15px;text-align: right">
                                            <span>Javier Hernadesz</span>
                                        </div>
                                        <div class="w3-col"
                                             style="width:10%;text-align: right;color: #616161;line-height: 3;padding-right: 10px;padding-top: 7px">
                                            <img src="Assets/menu_aboutus@1x.png" width="25">
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="w3-row">
                                        <div class="w3-col"
                                             style="width:10%;color: #616161;line-height: 3;padding-left: 10px;padding-top: 7px">
                                            <img src="Assets/menu_aboutus@1x.png" width="25"></div>
                                        <div class="w3-col" style="width:35%;padding-top: 15px">
                                            <span>Hector Moreno</span>
                                        </div>
                                        <div class="w3-col"
                                             style="width:10%;color:#C5C5C5;padding-top: 15px;text-align: center">'86
                                        </div>
                                        <div class="w3-col" style="width:35%;padding-top: 15px;text-align: right">
                                            <span>Javier Hernadesz</span>
                                        </div>
                                        <div class="w3-col"
                                             style="width:10%;text-align: right;color: #616161;line-height: 3;padding-right: 10px;padding-top: 7px">
                                            <img src="Assets/menu_aboutus@1x.png" width="25">
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
                            <img src="Assets/football_ground.png" width="100%">
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
            dataDetail: {}
        };
    },

    methods: {
        setDataDetail: function (val) {
            this.dataDetail = val
        }
    },
    created(){
        let self = this;
        Event.listen('livescoreDetail', function (v) {
            self.setDataDetail(v);
        })
    }
})