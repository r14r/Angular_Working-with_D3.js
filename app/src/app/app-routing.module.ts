import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetStartedPageComponent } from './pages/get-started/get-started.page';
import { BarChartRaceComponent } from './blocks/bar-chart-race/pages/page';
import { RotatedText1Component } from './blocks/text/pages/page';


const routes: Routes = [
	{ path: 'get-started', component: GetStartedPageComponent },
	{ path: 'bar-chart-race', component: BarChartRaceComponent },
	{ path: 'text-rotated', component: RotatedText1Component },
	{ path: '', redirectTo: '/get-started', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
