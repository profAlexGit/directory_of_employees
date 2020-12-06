import {Paper} from '@material-ui/core';
import React, {FC} from 'react';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../hooks/use-stores';
import {ActionPanel} from '../ActionPanel';
import EmplyeeList from '../EmployeeList/EmployeeList';
import {EmployeerInfoContainer} from '../EmployeerInfoContainer';
import {Spinner} from '../Spinner';

const App: FC = observer(() => {
	const {employeeStore} = useStores();

	// if (employeeStore.isLoading) {
	// 	debugger
	// 	return <Spinner />;
	// }

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
});

export {App};
