import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DataService, IDataItem } from "../core/data.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
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

    setHomeTeam(team){
        this.itemService.setHomeTeam(team);
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
