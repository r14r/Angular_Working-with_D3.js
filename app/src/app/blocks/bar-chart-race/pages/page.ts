import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import * as d3 from 'd3';
import { Toolbox } from 'src/app/helpers/toolbox.service';
import { DataItem } from '../model/data.model';

@Component({
	selector: 'app-bar-chart-race',
	templateUrl: './page.html',
	styleUrls: ['./page.scss']
})
export class BarChartRaceComponent implements OnInit, OnDestroy {
	public ID = 'BarChartRace1Component';
	private toolbox = new Toolbox(this.ID);

	@ViewChild('d3chart', { static: true }) private chartContainer: ElementRef;

	private data: any;
	private svg: any;
	private ticker: any;

	tickDuration = 200;

	topN = 12;

	title = '18 years of Interbrand’s Top Global Brands';
	subtitle = 'Brand value, $m';
	source = 'Source: Interbrand';

	height = 800;
	width = 960;
	left = 50;

	margin = { top: 100, right: 0, bottom: 0, left: 150 };
	barPadding = (this.height - (this.margin.bottom + this.margin.top)) / (this.topN * 5);

	scaleX: any;
	scaleY: any;
	xAxis: any;

	year = 2000;
	yearText: any;

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

	halo(text, strokeWidth) {
		text.select(function () { return this.parentNode.insertBefore(this.cloneNode(true), this); })
			.style('fill', '#ffffff')
			.style('stroke', '#ffffff')
			.style('stroke-width', strokeWidth)
			.style('stroke-linejoin', 'round')
			.style('opacity', 1);
	}

	demo_tick() {
		// this.toolbox.log('demo_ticker', 'call this.ticker for year = ' + this.year);

		const yearSlice = this.data
			.filter((d) => d.year == this.year && !isNaN(d.value))
			.sort((a, b) => b.value - a.value)
			.slice(0, this.topN);

		yearSlice.forEach((d, i) => d.rank = i);

		// this.toolbox.log('demo_ticker', 'yearSlice');
		// console.table(yearSlice);

		this.scaleX.domain([0, d3.max(yearSlice, d => d.value)]);

		this.svg.select('.xAxis')
			.transition()
			.duration(this.tickDuration)
			.ease(d3.easeLinear)
			.call(this.xAxis);

		/**/
		const bars = this.svg.selectAll('.bar').data(yearSlice, d => d.name);
		bars
			.enter()
			.append('rect')
			.attr('class', d => `bar ${d.name.replace(/\s/g, '_')}`)
			.attr('x', this.scaleX(0) + 1)
			.attr('width', d => this.scaleX(d.value) - this.scaleX(0) - 1)
			.attr('y', d => this.scaleY(this.topN + 1) + 5)
			.attr('height', this.scaleY(1) - this.scaleY(0) - this.barPadding)
			.style('fill', d => d.color)
			.transition()
			.duration(this.tickDuration)
			.ease(d3.easeLinear)
			.attr('y', d => this.scaleY(d.rank) + 5);

		bars
			.transition()
			.duration(this.tickDuration)
			.ease(d3.easeLinear)
			.attr('width', d => this.scaleX(d.value) - this.scaleX(0) - 1)
			.attr('y', d => this.scaleY(d.rank) + 5);

		bars
			.exit()
			.transition()
			.duration(this.tickDuration)
			.ease(d3.easeLinear)
			.attr('width', d => this.scaleX(d.value) - this.scaleX(0) - 1)
			.attr('y', d => this.scaleY(this.topN + 1) + 5)
			.remove();

		/**/
		const labels = this.svg.selectAll('.label')
			.data(yearSlice, d => d.name);

		labels
			.enter()
			.append('text')
			.attr('class', 'label')
			.attr('x', d => this.scaleX(d.value) - 8)
			.attr('y', d => this.scaleY(this.topN + 1) + 5 + ((this.scaleY(1) - this.scaleY(0)) / 2))
			.style('text-anchor', 'end')
			.style('font-weight', 'bold')
			.html(d => d.name)
			.transition()
			.duration(this.tickDuration)
			.ease(d3.easeLinear)
			.attr('y', d => this.scaleY(d.rank) + 5 + ((this.scaleY(1) - this.scaleY(0)) / 2) + 1);

		labels
			.transition()
			.duration(this.tickDuration)
			.ease(d3.easeLinear)
			.attr('x', d => this.scaleX(d.value) - 8)
			.attr('y', d => this.scaleY(d.rank) + 5 + ((this.scaleY(1) - this.scaleY(0)) / 2) + 1);

		labels
			.exit()
			.transition()
			.duration(this.tickDuration)
			.ease(d3.easeLinear)
			.attr('x', d => this.scaleX(d.value) - 8)
			.attr('y', d => this.scaleY(this.topN + 1) + 5)
			.remove();

		/**/
		const valueLabels = this.svg.selectAll('.valueLabel').data(yearSlice, d => d.name);

		valueLabels
			.enter()
			.append('text')
			.attr('class', 'valueLabel')
			.attr('x', d => this.scaleX(d.value) + 5)
			.attr('y', d => this.scaleY(this.topN + 1) + 5)
			.text(d => d3.format(',.0f')(d.lastValue))
			.transition()
			.duration(this.tickDuration)
			.ease(d3.easeLinear)
			.attr('y', d => this.scaleY(d.rank) + 5 + ((this.scaleY(1) - this.scaleY(0)) / 2) + 1);

		valueLabels
			.transition()
			.duration(this.tickDuration)
			.ease(d3.easeLinear)
			.attr('x', d => this.scaleX(d.value) + 5)
			.attr('y', d => this.scaleY(d.rank) + 5 + ((this.scaleY(1) - this.scaleY(0)) / 2) + 1)
			.tween('text', (d) => {
				const i = d3.interpolateRound(d.lastValue, d.value);
				return function (t) {
					this.textContent = d3.format(',')(i(t));
				};
			});

		valueLabels
			.exit()
			.transition()
			.duration(this.tickDuration)
			.ease(d3.easeLinear)
			.attr('x', d => this.scaleX(d.value) + 5)
			.attr('y', d => this.scaleY(this.topN + 1) + 5)
			.remove();

		this.yearText.html(d3.format('.4d')(this.year));

		if (this.year == 2018) {
			this.ticker.stop();
		}

		this.year = d3.format('.1f')((+this.year) + 0.1);
	}

	demo_init() {
		this.toolbox.log('demo_init');

		// Version 1
		// this.svg = d3.select('body').append('svg')

		// Version 2
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

		const caption = this.svg.append('text')
			.attr('class', 'caption')
			.attr('x', this.width)
			.attr('y', this.height - 5)
			.style('text-anchor', 'end')
			.style('font-size', '2em')
			.html(this.source);

		this.year = 2000;

		this.yearText = this.svg.append('text')
			.attr('class', 'yearText')
			.attr('x', this.width - this.margin.right)
			.attr('y', this.height - 50)
			.style('text-anchor', 'end')
			.style('font-size', '3em')
			.html(this.year)
			// 	.call(this.halo, 10)
			;

		d3.csv('/assets/data/brand_values.csv').then((input) => {
			input.forEach(d => {
				d.value = +d.value;
				d.lastValue = +d.lastValue;
				d.value = isNaN(d.value) ? 0 : d.value;
				d.year = +d.year;
				d.color = d3.hsl(Math.random() * 360, 0.75, 0.75);

				// const item = new DataItem(d.name, d.value, d.lastValue, d.year, d.color, -1);
			});

			this.data = input;
			// this.toolbox.log('demo', 'csv data read in');

			const yearSlice = this.data.filter(d => d.year === this.year && !isNaN(d.value))
				.sort((a, b) => b.value - a.value)
				.slice(0, this.topN);

			yearSlice.forEach((d, i) => d.rank = i);

			this.scaleX = d3.scaleLinear()
				.domain([0, d3.max(yearSlice, d => d.value)])
				.range([this.margin.left, this.width - this.margin.right - 65]);

			this.scaleY = d3.scaleLinear()
				.domain([this.topN, 0])
				.range([this.height - this.margin.bottom, this.margin.top]);

			this.xAxis = d3.axisTop()
				.scale(this.scaleX)
				.ticks(this.width > 500 ? 5 : 2)
				.tickSize(-(this.height - this.margin.top - this.margin.bottom))
				.tickFormat(d => d3.format(',')(d));

			this.svg.append('g')
				.attr('class', 'axis xAxis')
				.attr('transform', `translate(0, ${this.margin.top})`)
				.call(this.xAxis)
				.selectAll('.tick line')
				.classed('origin', d => d === 0);

			this.svg.selectAll('rect.bar')
				.data(yearSlice, d => d.name)
				.enter()
				.append('rect')
				.attr('class', 'bar')
				.attr('x', this.scaleX(0) + 1)
				.attr('y', d => this.scaleY(d.rank) + 5)
				.attr('width', d => this.scaleX(d.value) - this.scaleX(0) - 1)
				.attr('height', this.scaleY(1) - this.scaleY(0) - this.barPadding)
				.style('fill', d => d.color);

			//
			//
			//
			this.svg.selectAll('text.label')
				.data(yearSlice, d => d.name)
				.enter()
				.append('text')
				.attr('class', 'label')
				.attr('x', d => this.scaleX(d.value) - 8)
				.attr('y', d => this.scaleY(d.rank) + 5 + ((this.scaleY(1) - this.scaleY(0)) / 2) + 1)
				.style('text-anchor', 'end')
				.style('font-weight', 'bold')
				.html(d => d.name);

			this.svg.selectAll('text.valueLabel')
				.data(yearSlice, d => d.name)
				.enter()
				.append('text')
				.attr('class', 'valueLabel')
				.attr('x', d => this.scaleX(d.value) + 5)
				.attr('y', d => this.scaleY(d.rank) + 5 + ((this.scaleY(1) - this.scaleY(0)) / 2) + 1)
				.text(d => d3.format(',.0f')(d.lastValue));
		});
	}

	demo() {
		this.toolbox.log('demo');

		/**/
		this.demo_init();

		/**/
		this.toolbox.log('demo', 'create ticker');

		this.ticker = d3.interval(e => {
			this.demo_tick();
		}, this.tickDuration);
	}

}
