import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService, IDataItem } from "../core/data.service";

@Component({
    selector: "HomeDetail",
    moduleId: module.id,
    templateUrl: "./home-detail.component.html",
    styleUrls: ["./home-detail.component.scss"]
})
export class HomeDetailComponent implements OnInit {
    team: any;
    myImageSrc: any;

    constructor(
        private data: DataService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params.id;
        this.team = this.data.getHomeTeam();
        this.myImageSrc = "~/app/images/" + this.team.fields.team.stringValue + ".png";
    }
}
