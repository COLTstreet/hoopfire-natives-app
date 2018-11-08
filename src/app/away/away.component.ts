import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DataService, IDataItem } from "../core/data.service";

@Component({
    selector: "Away",
    moduleId: module.id,
    templateUrl: "./away.component.html"
})
export class AwayComponent implements OnInit {
    items: Array<IDataItem>;
    teams: any;

    constructor(private itemService: DataService, private router: RouterExtensions) { }

    ngOnInit(): void {
        // this.items = this.itemService.getItems();
        this.itemService.getData()
            .subscribe((result) => {
                this.onGetDataSuccess(result);
            }, (error) => {
                console.log(error);
            });
    }

    setAwayTeam(team){
        this.itemService.setAwayTeam(team);
    }

    getSrc(val){
        // console.log("~/images/" + val + ".png");
        return "~/app/images/" + val + ".png"
    }

    private onGetDataSuccess(res) {
        this.items = res.documents;
        this.itemService.setTeams(this.items);
    }
}
