export class DataItem {
	name: string;
	value: number;
	year: string;
	lastValue: number;
	rank: number;
	color: any;

	constructor(name, value, lastValue, year, color, rank) {
		this.name = name;
		this.value = value;
		this.lastValue = lastValue;
		this.year = year;
		this.rank = rank;
		this.color = color;
	}
}
