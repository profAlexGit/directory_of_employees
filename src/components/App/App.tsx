import {Paper} from '@material-ui/core';
import React, {FC} from 'react';
import {useStores} from '../../hooks/use-stores';
import {ActionPanel} from '../ActionPanel';
import EmplyeeList from '../EmployeeList/EmployeeList';
import {EmployeerInfoContainer} from '../EmployeerInfoContainer';

const App: FC = () => {
	const {employeeStore} = useStores();

	if (employeeStore.isLoading) {
		return null;
	}

	return (
		<div>
			<ActionPanel />
			<div className="d-flex">
				<Paper classes={{root: 'employeeList'}} elevation={3}>
					<EmplyeeList />
				</Paper>
				<EmployeerInfoContainer />
			</div>
		</div>
	);
};

export {App};
