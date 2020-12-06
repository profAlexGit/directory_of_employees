import { FC } from "react";
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IEmployeeItemProps } from "./types";


const EmployeeItem: FC<IEmployeeItemProps> = ({employeeName, active, setActiveEmployee}) => {
	return (
		<ListItem button selected={active} onClick={setActiveEmployee}>
			<ListItemText primary={employeeName} />
		</ListItem>
	);
};

export {EmployeeItem}