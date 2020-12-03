import {observable, action, computed} from 'mobx';
import {createContext} from 'react';
import { EPosition } from '../enums/position.enum';
import { IEmploee } from '../types/Emploee.types';
import {v4 as uuidv4} from 'uuid';

export class EmployeeStore {
	@observable emploees: IEmploee[] = [
		{
			id: uuidv4(),
			fullName: 'Федотов Алексей Романович',
			position: EPosition.developer,
			birthday: '20/01/1992',
			gender: 'male',
			dismissed: false,
			colleagues: [],
		},
	];

	@action addEmploee = (emploee: IEmploee) => {
		this.emploees.push({...emploee, id: uuidv4()});
	};

	@action removeEmployee = (id: string) => {
		this.emploees = this.emploees.filter((employee) => employee.id !== id);
	};
}
