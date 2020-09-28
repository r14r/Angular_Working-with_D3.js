import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class Toolbox {
	private MODULE: string;

	constructor(private module: string) {
		this.init(module);
	}

	init(module: string) {
		this.MODULE = module;
	}

	log(func, line = '') {
		console.log(this.MODULE + '::' + func + '|' + line);
	}
}
