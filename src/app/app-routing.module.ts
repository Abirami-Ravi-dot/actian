import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LatLongCoordinatesComponent } from "./components/lat-long-coordinates/lat-long-coordinates.component";
import { NotFoundComponent } from "./components/not-found.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  { path: "dashboard", component: LatLongCoordinatesComponent },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
