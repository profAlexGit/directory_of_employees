import {action, computed, makeAutoObservable} from 'mobx';
import {EPosition} from '../enums/position.enum';
import {IEmploee} from '../types/Emploee.types';
import {
	fetchEmployees,
	addEmpoyee,
	deleteEmployee,
	updateEmployee,
} from '../services/employeeService';

export class EmployeeStore {
	emploees: IEmploee[] = [];
	currentEmployee: null | IEmploee = null;
	isNotSavedChanges: boolean = false;

	isLoading: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	getCollegues(collegues: IEmploee[]) {
		const col = collegues.filter((employee) => {
			if (!this.currentEmployee?.colleagues?.includes(employee)) {
				return employee;
			}
		});
		return col;
	}

	@action
	toggleLoadingIndicator = (isLoading: boolean) => {
		this.isLoading = isLoading;
	};

	@action
	fetchEmployees = async () => {
		this.toggleLoadingIndicator(true);
		await fetchEmployees()
			.then((data) => {
				this.emploees = data;
				this.cleanCurrentEmployee();
			})
			.finally(() => {
				this.toggleLoadingIndicator(false);
			});
	};

	@action
	getFullName = (employee: IEmploee | null) => {
		if (!employee) {
			return '';
		}

		return `${employee.lastName} ${employee.firstName} ${employee.surName}`;
	};

	@action
	setIsNotSavedChanges = (isNotSavedChanges: boolean) => {
		this.isNotSavedChanges = isNotSavedChanges;
	};

	@action
	createEmployee = () => {
		this.currentEmployee = {
			firstName: '',
			lastName: '',
			surName: '',
			position: EPosition.developer,
			birthday: '',
			gender: 'male',
			dismissed: false,
			colleagues: [],
		};
	};

	@action addEmploee = async (emploee: Omit<IEmploee, 'id'>) => {
		const newEmployee = await addEmpoyee(emploee);
		this.emploees.push(newEmployee);
		this.cleanCurrentEmployee();
	};

	@action updateEmployee = async (updatedEmployee: IEmploee) => {
		const employee = await updateEmployee(updatedEmployee);
		const idx = this.emploees.findIndex((employee) => updatedEmployee.id === employee.id);
		this.emploees = [...this.emploees.slice(0, idx), employee, ...this.emploees.slice(idx + 1)];
		this.cleanCurrentEmployee();
	};

	@action removeEmployee = async (id: string) => {
		await deleteEmployee(id);
		this.emploees = this.emploees.filter((employee) => employee.id !== id);
		this.emploees.forEach((employee) => {
			employee.colleagues = employee.colleagues?.filter(
				(colleg: IEmploee) => colleg.id !== id
			);
		});
		this.cleanCurrentEmployee();
	};

	@action setCurrentEmployee = (id: string) => {
		this.setIsNotSavedChanges(false);
		this.currentEmployee = this.emploees.find((employee) => employee.id === id) || null;
	};

	@action cleanCurrentEmployee = () => {
		this.currentEmployee = null;
	};

	@computed get getEmployees(): IEmploee[] {
		return this.emploees;
	}

	@computed get getCurrentEmployee() {
		return this.currentEmployee;
	}

	@computed get possibleColleagues() {
		return this.emploees.filter((employee) => employee !== this.currentEmployee);
	}
}
