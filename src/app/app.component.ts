import { Component, OnInit, ViewChild } from "@angular/core";
import { isAndroid } from "tns-core-modules/platform";
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view"
import { MatchupComponent } from "./matchup/matchup.component";
import { DataService } from "./core/data.service";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    @ViewChild(MatchupComponent) matchUpComponent: MatchupComponent;

    constructor(private data: DataService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    getIconSource(icon: string): string {
        const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";

        return iconPrefix + icon;
    }

    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        this.data.currentIndex.next(args.newIndex);
    }
}
