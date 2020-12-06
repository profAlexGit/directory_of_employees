import React, {FC} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IAlertDilogProps } from './types';

const AlertDialog: FC<IAlertDilogProps> = ({isOpen, handleSuccess, handleCancel}) => {
	return (
		<div>
			<Dialog
				open={isOpen}
				onClose={handleCancel}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Предупреждение'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Все несохраненные данные исчезнут. Продолжить?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancel} color="primary">
						нет
					</Button>
					<Button onClick={handleSuccess} color="primary" autoFocus>
						да
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export {AlertDialog};
