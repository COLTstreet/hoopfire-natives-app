import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService, IDataItem } from "../core/data.service";
import { Page } from "tns-core-modules/ui/page/page";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
registerElement('CardView', () => CardView);

import * as utilityModule from "tns-core-modules/utils/utils";

@Component({
    selector: "HomeDetail",
    moduleId: module.id,
    templateUrl: "./home-detail.component.html",
    styleUrls: ["./home-detail.component.scss"]
})
export class HomeDetailComponent implements OnInit {
    @ViewChild('content') pageContent: ElementRef;
    
    team: any;
    myImageSrc: any;

    constructor(
        private data: DataService,
        private route: ActivatedRoute,
        private page: Page
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params.id;
        this.team = this.data.getHomeTeam();
        this.myImageSrc = "~/app/images/" + this.team.fields.team.stringValue + ".png";
        let temp = this.page.getViewById("home");
        temp.style.backgroundImage = this.myImageSrc;
        temp.style.backgroundRepeat = 'no-repeat';
        temp.style.backgroundPosition = 'center';
        temp.style.backgroundSize = 'cover';
    }

    goToInjuries() {
        utilityModule.openUrl("https://www.cbssports.com/nba/injuries");
    }
}
