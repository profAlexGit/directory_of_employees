import React, {FC} from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../../hooks/use-stores';
import './styles.scss';
import { EmployeeForm } from '../EmployeeForm';
import { Paper } from '@material-ui/core';

const EmployeerInfoContainer: FC = observer(() => {
    const {employeeStore} = useStores();

	return (
		<Paper classes={{root: 'form-container'}} elevation={3}>
			{employeeStore.currentEmployee ? (
				<EmployeeForm initialValues={employeeStore.currentEmployee} />
			) : (
				<p>Выберите сотрудника из списка</p>
			)}
		</Paper>
	);
});

export {EmployeerInfoContainer};
