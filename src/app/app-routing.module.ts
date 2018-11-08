import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AwayComponent } from "./away/away.component";
import { HomeComponent } from "./home/home.component";
import { MatchupComponent } from "./matchup/matchup.component";
import { HomeDetailComponent } from "./home-detail/home-detail.component";
import { AwayDetailComponent } from "./away-detail/away-detail.component";

export const COMPONENTS = [AwayComponent, HomeComponent, HomeDetailComponent, AwayDetailComponent, MatchupComponent];

const routes: Routes = [
    { path: "", redirectTo: "/(homeTab:home//awayTab:away//matchupTab:matchup)", pathMatch: "full" },

    { path: "home", component: HomeComponent, outlet: "homeTab" },
    { path: "away", component: AwayComponent, outlet: "awayTab" },
    { path: "matchup", component: MatchupComponent, outlet: "matchupTab" },

    { path: "homeTeam/:id", component: HomeDetailComponent, outlet: "homeTab" },
    { path: "awayTeam/:id", component: AwayDetailComponent, outlet: "awayTab" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
