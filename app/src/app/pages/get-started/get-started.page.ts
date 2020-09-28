import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as d3 from 'd3';
import { Toolbox } from 'src/app/helpers/toolbox.service';


@Component({
	selector: 'app-get-started-page',
	templateUrl: './get-started.page.html',
	styleUrls: ['./get-started.page.scss']
})
export class GetStartedPageComponent implements OnInit {
	public ID = 'GetStartedPageComponent';

	private toolbox = new Toolbox(this.ID);

	@ViewChild('chart', { static: true }) private chartContainer: ElementRef;

	//
	//
	//
	private margin: any = { top: 10, bottom: 10, left: 10, right: 10 };
	private chart: any;
	private width: number;
	private height: number;
	private xScale: any;
	private yScale: any;
	private colors: any;
	private xAxis: any;
	private yAxis: any;


	constructor() {
		this.toolbox.log('constructor');
	}

	ngOnInit() {
		this.toolbox.log('ngOnInit');

		this.createShapes();
	}

	demo1_run() {
		this.toolbox.log('demo1_run');

		d3.select('#p1')
			.transition().duration(2000)
			.attr('width', '200')
			.transition()
			.attr('height', '100')
			.transition()
			.style('fill', 'red')
			.transition().duration(200)
			.attr('height', '10').attr('width', '10');
	}

	demo2_init() {
		this.toolbox.log('demo2_init');

		const position = [20, 40, 60, 80];

		d3.select('#p2')
			.selectAll('mycircles')
			.data(position)
			.enter()
			.append('circle')
			.attr('cx', d => d)
			.attr('cy', 10)
			.attr('r', 10);

	}
	demo2_run() {
		this.toolbox.log('demo2_run');

		this.demo2_init();

		d3.selectAll('circle')
			.transition()
			.duration(2000)
			.attr('cy', 300)
			.delay((i) => i * 10);
	}

	demo3_init() {
		this.toolbox.log('demo3_init');
	}

	demo3_run() {
		this.toolbox.log('demo3_run');

		const svg = d3.select('#p3');

		this.toolbox.log('demo3_run', 'create x axis');
		const x = d3.scaleLinear()
			// This is what is written on the Axis: from 0 to 100
			.domain([0, 100])
			// This is where the axis is placed: from 100 px to 800px
			.range([10, 400]);

		this.toolbox.log('demo3_run', 'append g');
		svg.append('g')
			// This controls the vertical position of the Axis
			.attr('transform', 'translate(0,200)')
			.call(d3.axisBottom(x))
			.attr('class', 'myAxis');

		this.toolbox.log('demo3_run', 'set domain');
		x.domain([0, 1000]);

		this.toolbox.log('demo3_run', 'transition');
		svg.select('.myAxis')
			.transition()
			.duration(3000)
			.call(d3.axisBottom(x));
	}

	demo4_init() {
		this.toolbox.log('demo3_init');

		const data1 = [50, 100, 150, 200];

		const svg = d3.select('#p4');

		// Add circles at the top
		svg
			.selectAll('mycircles')
			.data(data1)
			.enter()
			.append('circle')
			.attr('cx', (d) => d)
			.attr('cy', 10)
			.attr('r', 10);
	}

	demo4_run() {
		this.toolbox.log('demo4_run');

		this.demo4_init();

		const data2 = [40, 50, 60, 80];

		const u = d3
			.select('#p4')
			.selectAll('circle')
			.data(data2);

		u
			.transition()
			.duration(1000)
			.attr('cx', (d) => d)
			.attr('cy', 100)
			.attr('r', 10)
			.style('color', 'ff0000')
			;

		u
			.exit()
			.transition()
			.duration(1000)
			.style('opacity', 0)
			.remove();
	}


	demo5_init() {
		this.toolbox.log('demo5_init');
	}

	demo5_run() {
		this.toolbox.log('demo5_run');
	}

	createShapes(): void {
		this.toolbox.log('createShapes');

		//
		//
		//
		const dataCircles = [
			{ x: 30, y: 30, r: 20, color: 'green' },
			{ x: 70, y: 70, r: 20, color: 'purple' },
			{ x: 110, y: 100, r: 20, color: 'red' }
		];

		const dataRectangles = [
			{ x: 100, y: 0, width: 100, height: 80, color: 'green' },
			{ x: 140, y: 70, width: 70, height: 50, color: 'purple' },
			{ x: 180, y: 100, width: 50, height: 25, color: 'red' }
		];

		const dataEllipses = [
			{ cx: 250, cy: 20, rx: 50, ry: 20, color: 'green' },
			{ cx: 270, cy: 70, rx: 20, ry: 50, color: 'purple' },
			{ cx: 290, cy: 90, rx: 40, ry: 70, color: 'red' }];

		const dataLines = [
			{ x1: 400, y1: 50, x2: 400, y2: 140, width: 2, color: 'green' },
			{ x1: 450, y1: 10, x2: 450, y2: 120, width: 4, color: 'purple' },
			{ x1: 500, y1: 20, x2: 500, y2: 190, width: 6, color: 'red' }];

		const dataText = [
			{ x: 10, y: 40, color: 'green', text: 'Beispiel Normal', class: 'd3-text-normal' },
			{ x: 460, y: 100, color: 'purple', text: 'Beispiel Bold', class: 'd3-text-bold' },
			{ x: 90, y: 80, color: 'red', text: 'Beispiel Normal', class: 'd3-text-normal' }
		];

		//
		//
		//
		const viewChild = this.chartContainer;
		this.toolbox.log('createShapes', 'viewChild = ' + viewChild);

		const element = viewChild.nativeElement;
		this.toolbox.log('createShapes', 'element = ' + element);

		this.width = element.offsetWidth - this.margin.left - this.margin.right;
		this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

		this.toolbox.log('createShapes', 'width = ' + this.width);
		this.toolbox.log('createShapes', 'height = ' + this.height);

		const svgContainer = d3.select(element).append('svg');

		// Version 2:
		// const svgContainer = d3.select('#circles').append('svg');

		svgContainer
			.attr('width', this.width)
			.attr('height', this.height)
			.style('border', '1px solid black');

		//
		//
		//
		this.toolbox.log('createShapes', 'add circles');

		const circles = svgContainer.selectAll('circle')
			.data(dataCircles)
			.enter()
			.append('circle');

		circles
			.attr('cx', (d) => d.x)
			.attr('cy', (d) => d.y)
			.attr('r', (d) => d.r)
			.style('fill', (d) => d.color);

		//
		//
		//
		this.toolbox.log('createShapes', 'add rectangles');

		const rectangles = svgContainer.selectAll('rect')
			.data(dataRectangles)
			.enter()
			.append('rect');

		rectangles
			.attr('x', (d) => d.x)
			.attr('y', (d) => d.y)
			.attr('width', (d) => d.width)
			.attr('height', (d) => d.height)
			.style('fill', (d) => d.color);

		//
		//
		//
		this.toolbox.log('createShapes', 'add ellipse');

		const ellipses = svgContainer.selectAll('ellipse')
			.data(dataEllipses)
			.enter()
			.append('ellipse');

		ellipses
			.attr('cx', (d) => d.cx)
			.attr('cy', (d) => d.cy)
			.attr('rx', (d) => d.rx)
			.attr('ry', (d) => d.ry)
			.style('fill', (d) => d.color);

		//
		//
		//
		this.toolbox.log('createShapes', 'add lines');

		const lines = svgContainer.selectAll('line')
			.data(dataLines)
			.enter()
			.append('line');

		lines
			.attr('x1', (d) => d.x1)
			.attr('y1', (d) => d.y1)
			.attr('x2', (d) => d.x2)
			.attr('y2', (d) => d.y2)
			.attr('stroke-width', (d) => d.width)
			.attr('stroke', (d) => d.color);

		//
		//
		//
		this.toolbox.log('createShapes', 'add text');

		const text = svgContainer.selectAll('text')
			.data(dataText)
			.enter()
			.append('text');

		text
			.attr('x', (d) => d.x)
			.attr('y', (d) => d.y)
			.html((d) => d.text)
			.attr('class', (d) => d.class);
	}
}
