import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService, IDataItem } from "../core/data.service";
import { Page } from "tns-core-modules/ui/page/page";

import * as utilityModule from "tns-core-modules/utils/utils";

@Component({
    selector: "AwayDetail",
    moduleId: module.id,
    templateUrl: "./away-detail.component.html",
    styleUrls: ["./away-detail.component.scss"]
})
export class AwayDetailComponent implements OnInit {

    team: any;
    leagueAverage: any;
    myImageSrc: any;

    categoricalSource: { Name: string, Pace: number, dRtg: number, oRtg: number, Rank: number }[] = [
    ];

    constructor(
        private data: DataService,
        private route: ActivatedRoute,
        private page: Page
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params.id;
        this.team = this.data.getAwayTeam();
        this.leagueAverage = this.data.getLeagueAverage();
        this.buildChart();
        this.myImageSrc = "~/app/images/" + this.team.fields.team.stringValue + ".png";
        let temp = this.page.getViewById("away");
        temp.style.backgroundImage = this.myImageSrc;
        temp.style.backgroundRepeat = 'no-repeat';
        temp.style.backgroundPosition = 'center';
        temp.style.backgroundSize = 'cover';
    }

    buildChart() {
        this.categoricalSource.push({ 
            Name: this.leagueAverage.fields.team.stringValue, 
            Pace: Number(this.leagueAverage.fields.pace.stringValue), 
            dRtg: Number(this.leagueAverage.fields.dRtg.stringValue), 
            oRtg: Number(this.leagueAverage.fields.oRtg.stringValue), 
            Rank: Number(this.leagueAverage.fields.rank.stringValue)
        });
        this.categoricalSource.push({ 
            Name: this.team.fields.team.stringValue, 
            Pace: Number(this.team.fields.pace.stringValue), 
            dRtg: Number(this.team.fields.dRtg.stringValue), 
            oRtg: Number(this.team.fields.oRtg.stringValue), 
            Rank: Number(this.team.fields.rank.stringValue)
        });
    }

    goToInjuries() {
        utilityModule.openUrl("https://www.cbssports.com/nba/injuries");
    }
}
