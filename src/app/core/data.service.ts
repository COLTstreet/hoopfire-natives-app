import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

export interface IDataItem {
    id: number;
    name: string;
    description: string;
}

@Injectable()
export class DataService {
    constructor(private http: HttpClient) {
    }

    public currentIndex = new BehaviorSubject(0);

    private serverUrl = "https://firestore.googleapis.com/v1beta1/projects/hoopfire-api/databases/(default)/documents/nba-teams?pageSize=50&key=a9d366bac3abc2f55bca7a4fa84512befed452f2";
    private teams: any;
    private homeTeam: any;
    private awayTeam: any;
    private leagueAverage: any;

    getTeam(id: number) {
        console.log("team rank:" + id);
    }

    setTeams(teams) {
        this.teams = teams;
        let scope = this;
        teams.forEach(function(element) {
            if(element.fields.team.stringValue === "League Average"){
                scope.leagueAverage = element;
            }
        });
    }
    
    getLeagueAverage() {
        return this.leagueAverage;
    }

    getTeams() {
        return this.teams;
    }

    setHomeTeam(team) {
        this.homeTeam = team;
    }

    getHomeTeam() {
        return this.homeTeam;
    }

    setAwayTeam(team) {
        this.awayTeam = team;
    }

    getAwayTeam() {
        return this.awayTeam;
    }

    getData() {
        return this.http.get(this.serverUrl);
    }
}
