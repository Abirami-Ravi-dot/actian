import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LatLongCoordinatesComponent } from './components/lat-long-coordinates/lat-long-coordinates.component';
import { AppComponent } from './app.component';


const  routes:  Routes  = [
{
path:  '',
component:  LatLongCoordinatesComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
