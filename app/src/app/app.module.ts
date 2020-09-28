import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetStartedPageComponent } from './pages/get-started/get-started.page';
import { BarChartRaceComponent } from './blocks/bar-chart-race/pages/page';
import { RotatedText1Component } from './blocks/text/pages/page';

@NgModule({
	declarations: [
		AppComponent,
		GetStartedPageComponent,
		BarChartRaceComponent,
		RotatedText1Component
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
