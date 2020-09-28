import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import * as d3 from 'd3';
import { Toolbox } from 'src/app/helpers/toolbox.service';
import { DataItem } from '../model/data.model';

@Component({
	selector: 'app-text-rotated',
	templateUrl: './page.html',
	styleUrls: ['./page.scss']
})
export class RotatedText1Component implements OnInit, OnDestroy {
	public ID = 'RotatedText1Component';
	private toolbox = new Toolbox(this.ID);

	@ViewChild('d3chart', { static: true }) private chartContainer: ElementRef;

	private data: any;
	private svg: any;
	private ticker: any;

	tickDuration = 200;

	topN = 12;

	title = 'TITLE';
	subtitle = 'SUBTITLE';
	source = 'DATASOURCE';

	height = 800;
	width = 960;
	left = 50;

	margin = { top: 100, right: 0, bottom: 0, left: 150 };
	barPadding = (this.height - (this.margin.bottom + this.margin.top)) / (this.topN * 5);

	scaleX: any;
	scaleY: any;
	xAxis: any;

	constructor() {
		this.toolbox.log('constructor');
	}

	ngOnInit() {
		this.toolbox.log('ngOnInit');
	}

	ngOnDestroy() {
		if (this.ticker !== undefined) {
			this.ticker.stop();
		}
	}

	demo_tick() {
	}

	demo_init() {
		this.toolbox.log('demo_init');

		const viewChild = this.chartContainer;
		// this.toolbox.log('createShapes', 'viewChild = ' + viewChild);

		const element = viewChild.nativeElement;
		// this.toolbox.log('createShapes', 'element = ' + element);

		this.width = element.offsetWidth - this.margin.left - this.margin.right;
		this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

		// this.toolbox.log('createShapes', 'width = ' + this.width);
		// this.toolbox.log('createShapes', 'height = ' + this.height);

		this.svg = d3.select(element).append('svg');

		this.svg
			.classed('svg', true)
			.attr('width', this.width)
			.attr('height', this.height);

		const title = this.svg.append('text')
			.classed('title', true)
			.attr('y', 25)
			.attr('x', this.left)
			.style('font-size', '2em')
			.html(this.title);

		const subTitle = this.svg.append('text')
			.classed('subTitle', true)
			.attr('y', 55)
			.attr('x', this.left)
			.style('font-size', '1em')
			.html(this.subtitle);
	}

	demo() {
		this.toolbox.log('demo');

		/**/
		this.demo_init();

		/**/
		this.ticker = d3.interval(e => {
			this.demo_tick();
		}, this.tickDuration);
	}

}
