import React, {FC, useState, useEffect, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../hooks/use-stores';
import List from '@material-ui/core/List';
import {EmployeeItem} from '../EmplyeeItem';
import { Spinner } from '../Spinner';

const EmplyeeList: FC = observer(() => {
	const {employeeStore} = useStores();

	useEffect(() => {
		employeeStore.fetchEmployees();
	}, [])

	const handleSetActiveEmployee = (id?: string) => {
		id && employeeStore.setCurrentEmployee(id);
	};

	if (employeeStore.isLoading) {
		return <Spinner />;
	}
	
	return (
		<List component="nav" aria-label="secondary mailbox folders">
			{employeeStore.getEmployees.map((employee) => {
				return (
					<EmployeeItem
						key={employee.id}
						employeeName={employeeStore.getFullName(employee)}
						active={employeeStore.currentEmployee?.id === employee.id}
						setActiveEmployee={() => handleSetActiveEmployee(employee.id)}
					/>
				);
			})}
		</List>
	);
});

export default EmplyeeList;
