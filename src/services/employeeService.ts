import {IEmploee} from '../types/Emploee.types';
import api from '../utils/api';

export async function fetchEmployees() {
	const employees = await api.get('/employees');
	return employees.data;
}

export async function addEmpoyee(employee: IEmploee) {
	const newEmployee = await api.post('/employees', {
		...employee,
	});
	return newEmployee.data;
}

export async function deleteEmployee(id: string) {
    await api.delete(`/employees/${id}`);
}

export async function updateEmployee(employee: IEmploee) {
    const updatedEmployee = await api.patch(`/employees/${employee.id}`, {
		...employee,
	});
	return updatedEmployee.data;
}
