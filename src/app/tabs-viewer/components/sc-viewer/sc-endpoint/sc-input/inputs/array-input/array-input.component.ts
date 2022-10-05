import { Component, Input, OnInit } from '@angular/core';
import { VariadicType } from '@elrondnetwork/erdjs/out';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
	selector: 'app-array-input',
	templateUrl: './array-input.component.html',
	styleUrls: ['./array-input.component.scss']
})
export class ArrayInputComponent implements OnInit {
	@Input() projectId: string = '';
	@Input() chainId: string = '';
	@Input() name: string = '';

	@Input() type!: VariadicType;

	form: FormGroup;

	get list(): FormArray {
		return this.form.get('list') as FormArray;
	}

	constructor(private readonly fb: FormBuilder) {
		this.form = this.fb.group({
			list: this.fb.array([]),
		});
	}

	ngOnInit(): void {
	}

	addElement(): void {
		this.list.push(new FormControl());
	}

	moveItem(prevIndex: number, currentIndex: number): void {
		const arr = this.list.value;

		moveItemInArray(arr, prevIndex, currentIndex);

		console.log('before', arr)
		console.log(`move (${prevIndex}, ${currentIndex})`)
		console.log('after', arr)


		this.list.setValue(arr);

		console.log('LIST', this.list.value);
	}

	delete(index: number): void {
		this.list.removeAt(index);
	}

	clear(): void {
		this.list.clear({emitEvent: true});
	}
}