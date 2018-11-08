import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DataService } from "../core/data.service";
import { ActivatedRoute } from "@angular/router";

export class Team {
    fields: {
        "rank": {"stringValue": string},
        "oRtg": {"stringValue": string},
        "losses": {"stringValue": string},
        "team": {"stringValue": string},
        "pace": {"stringValue": string},
        "wins": {"stringValue": string},
        "dRtg": {"stringValue": string}
    }
}

@Component({
    selector: "Matchup",
    moduleId: module.id,
    templateUrl: "./matchup.component.html",
    styleUrls: ["./matchup.component.scss"]
})
export class MatchupComponent implements OnInit  {
    // get homeTeam(): any {
    //     return this.data.getHomeTeam();
    // }
    // get awayTeam(): any {
    //     return this.data.getAwayTeam();
    // }
    
    constructor(
        private data: DataService,
        private route: ActivatedRoute
    ) { }

    homeTeam: any;
    awayTeam: any;
    selected: any;
    currentNav: any;
    nbaTeams: any;
    avgPos: any;
    avgOff: any;
    firstTeam: any;
    secondTeam: any;
    homeWinChance: any;
    awayWinChance: any;
    homeScore: any;
    awayScore: any;
    winner: any;
    spread: any;
    confidenceScore: any;
    overUnder: any;
    totalPoints: any;
    leftScore: any;
    rightScore: any;
    leftWinner: any;
    rightWinner: any;
    loading: any;

    firstHome = true;
    secondHome = false;

    isVisible = false;


    ngOnInit(): void {
        this.data.currentIndex.subscribe((val) => {
            if(val === 2) {
                if(this.data.getHomeTeam()) {
                    this.nbaTeams = this.data.getTeams();

                    this.calculateAverages();

                    this.homeTeam = this.data.getHomeTeam();
                    this.awayTeam = this.data.getAwayTeam();

                    this.calculateOdds();
                    this.isVisible = true;
                }
            }
        })
    }

    calculateAverages() {
        let scope = this;
        scope.nbaTeams.forEach(function (element) {
            if (element.fields.team.stringValue === "League Average") {
                scope.avgPos = element.fields.pace.stringValue;
                scope.avgOff = element.fields.oRtg.stringValue;
            }
        });
    }

    calculateOdds() {
        if (this.homeTeam && this.awayTeam) {
            var adv = .010;

            var adjHomeOff = Number(this.homeTeam.fields.oRtg.stringValue) + Number(this.homeTeam.fields.oRtg.stringValue) * adv;
            var adjHomeDef = Number(this.homeTeam.fields.dRtg.stringValue) - Number(this.homeTeam.fields.dRtg.stringValue) * adv;

            var adjAwayOff = Number(this.awayTeam.fields.oRtg.stringValue) - Number(this.awayTeam.fields.oRtg.stringValue) * adv;
            var adjAwayDef = Number(this.awayTeam.fields.dRtg.stringValue) + Number(this.awayTeam.fields.dRtg.stringValue) * adv;

            var pythExp = 10.25;
            var adjHomePyth = Math.pow(adjHomeOff, pythExp) / (Math.pow(adjHomeOff, pythExp) + Math.pow(adjHomeDef, pythExp));
            var adjAwayPyth = Math.pow(adjAwayOff, pythExp) / (Math.pow(adjAwayOff, pythExp) + Math.pow(adjAwayDef, pythExp));

            var homeWinChance = (adjHomePyth - adjHomePyth * adjAwayPyth) / (adjHomePyth + adjAwayPyth - 2 * adjHomePyth * adjAwayPyth);
            this.homeWinChance = homeWinChance * 100;
            this.awayWinChance = (1 - homeWinChance) * 100;
            this.homeWinChance = this.homeWinChance.toFixed(0);
            this.awayWinChance = this.awayWinChance.toFixed(0);

            var adjPos = ((this.awayTeam.fields.pace.stringValue / this.avgPos) * (this.homeTeam.fields.pace.stringValue / this.avgPos)) * this.avgPos;

            var awayScoreDecimal = (((adjAwayOff / this.avgOff) * (adjHomeDef / this.avgOff)) * (this.avgOff) * (adjPos / 100));
            this.awayScore = Number(awayScoreDecimal.toFixed(0));
            var homeScoreDecimal = (((adjHomeOff / this.avgOff) * (adjAwayDef / this.avgOff)) * (this.avgOff) * (adjPos / 100));
            this.homeScore = Number(homeScoreDecimal.toFixed(0));

            var decSpread = Math.abs(homeScoreDecimal - (awayScoreDecimal));

            if (homeScoreDecimal > awayScoreDecimal) {
                this.spread = "-" + (Math.round(decSpread * 2) / 2).toFixed(1);
                this.winner = this.homeTeam.fields.team.stringValue;
                this.confidenceScore = this.homeWinChance;
            } else {
                this.spread = "-" + (Math.round(decSpread * 2) / 2).toFixed(1);
                this.winner = this.awayTeam.fields.team.stringValue;
                this.confidenceScore = this.awayWinChance;
            }

            if (this.firstHome) {
                this.leftScore = this.homeScore;
                this.rightScore = this.awayScore;
                if (homeScoreDecimal > awayScoreDecimal) {
                    this.leftWinner = true;
                    this.rightWinner = false;
                } else {
                    this.leftWinner = false;
                    this.rightWinner = true;
                }
            } else if (this.secondHome) {
                this.leftScore = this.awayScore;
                this.rightScore = this.homeScore;
                if (homeScoreDecimal > awayScoreDecimal) {
                    this.leftWinner = false;
                    this.rightWinner = true;
                } else {
                    this.leftWinner = true;
                    this.rightWinner = false;
                }
            }


            this.overUnder = (awayScoreDecimal + homeScoreDecimal).toFixed(2);
            this.totalPoints = this.homeScore + this.awayScore;
        }
    }
}
