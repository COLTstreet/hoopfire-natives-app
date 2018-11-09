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
    myImageSrc: any;

    constructor(
        private data: DataService,
        private route: ActivatedRoute,
        private page: Page
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params.id;
        this.team = this.data.getAwayTeam();
        this.myImageSrc = "~/app/images/" + this.team.fields.team.stringValue + ".png";
        let temp = this.page.getViewById("away");
        temp.style.backgroundImage = this.myImageSrc;
        temp.style.backgroundRepeat = 'no-repeat';
        temp.style.backgroundPosition = 'center';
        temp.style.backgroundSize = 'cover';
    }

    goToInjuries() {
        utilityModule.openUrl("https://www.cbssports.com/nba/injuries");
    }
}
