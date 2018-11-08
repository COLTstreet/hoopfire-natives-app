import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService, IDataItem } from "../core/data.service";

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
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params.id;
        this.team = this.data.getAwayTeam();
        this.myImageSrc = "~/app/images/" + this.team.fields.team.stringValue + ".png";
    }
}
