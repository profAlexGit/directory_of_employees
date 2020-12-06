import React, {FC, useState} from 'react';
import {Box, Button} from '@material-ui/core';
import {useStores} from '../../hooks/use-stores';
import {AlertDialog} from '../AlertDialog';
import {observer} from 'mobx-react-lite';

const ActionPanel: FC = observer(() => {
	const {employeeStore} = useStores();
	const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

	const isDeleteDisabled = () => {
		return !employeeStore.getCurrentEmployee?.id;
	};

	const deleteEmployee = () => {
		if (employeeStore.currentEmployee?.id) {
			employeeStore.removeEmployee(employeeStore.currentEmployee.id);
		}
	};

	const refreshEmployees = async () => {
		await employeeStore.fetchEmployees();
		setIsAlertOpen(false);
	};

	const handleRefresh = () => {
		if (employeeStore.isNotSavedChanges) {
			setIsAlertOpen(true);
			return;
		}
		refreshEmployees();
	};

	const handleAddNewEmployee = () => {
		employeeStore.createEmployee();
	};

	return (
		<Box display="flex">
			<Box margin={1}>
				<Button variant="contained" color="primary" onClick={handleAddNewEmployee}>
					+
				</Button>
			</Box>

			<Box margin={1}>
				<Button variant="contained" color="primary" onClick={handleRefresh}>
					Обновить
				</Button>
			</Box>

			<Box margin={1}>
				<Button
					variant="contained"
					color="secondary"
					onClick={deleteEmployee}
					disabled={isDeleteDisabled()}
				>
					Удалить
				</Button>
			</Box>

			<AlertDialog
				isOpen={isAlertOpen}
				handleSuccess={refreshEmployees}
				handleCancel={() => setIsAlertOpen(false)}
			/>
		</Box>
	);
});

export {ActionPanel};
