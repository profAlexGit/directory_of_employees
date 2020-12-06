import React, {FC, useEffect, useState} from 'react';
import {Formik, Form, Field, FormikProps} from 'formik';
import {observer} from 'mobx-react-lite';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {Checkbox, RadioGroup, TextField} from 'formik-material-ui';
import {FormControlLabel, FormLabel, MenuItem, Radio} from '@material-ui/core';
import {EPosition} from '../../enums/position.enum';
import {Autocomplete, AutocompleteRenderInputParams} from 'formik-material-ui-lab';
import {useStores} from '../../hooks/use-stores';
import {IEmploee} from '../../types/Emploee.types';
import MuiTextField from '@material-ui/core/TextField';
import {IEmployeeFormProps} from './types';

const genders = [
	{
		value: 'male',
		label: 'мужской',
	},
	{
		value: 'female',
		label: 'женский',
	},
];

const EmployeeForm: FC<IEmployeeFormProps> = observer(({initialValues}) => {
	const [isFormChanged, setIsFormChanged] = useState<boolean>(false);
	const {employeeStore} = useStores();

	useEffect(() => {
		setIsFormChanged(false);
	}, [employeeStore.currentEmployee]);

	const getOptionsFromEnum = (obj: any) => {
		const options: any[] = [];
		for (let key in obj) {
			const opt = {
				label: obj[key],
				value: obj[key],
			};

			options.push(opt);
		}

		return options;
	};

	const compareArrays = <T,>(a: T[], b: T[]) => {
		if (a.length !== b.length) {
			return true;
		}

		if (
			a.filter((item) => !b.includes(item)).length > 0 ||
			b.filter((item) => !a.includes(item)).length > 0
		) {
			return true;
		}

		return false;
	};

	const checkFormChanged = (values: any) => {
		let isChanged = false;
		Object.keys(initialValues).forEach((key) => {
			if (isChanged) {
				return;
			}
			
			if (
				Array.isArray(initialValues[key as keyof typeof initialValues]) && key==="colleagues"
			) {
				isChanged = compareArrays<IEmploee>(
					initialValues['colleagues'] || [],
					values[key]
				);
				return;
			}

			if (initialValues[key as keyof typeof initialValues] !== values[key]) {
				isChanged = true;
			}
		});

		employeeStore.setIsNotSavedChanges(isChanged);
		setIsFormChanged(isChanged);
	};

	return (
		<Formik
			enableReinitialize
			initialValues={initialValues}
			validate={(values) => {
				checkFormChanged(values);
			}}
			onSubmit={(values: IEmploee, {setSubmitting}) => {
				setSubmitting(false);
				initialValues.id
					? employeeStore.updateEmployee(values)
					: employeeStore.addEmploee(values);
				employeeStore.setIsNotSavedChanges(false);
				setIsFormChanged(false);
			}}
			render={(formikBag: FormikProps<IEmploee>) => (
				<Form>
					<Box margin={1}>
						<Field
							component={TextField}
							type="text"
							label="Фамилия"
							name="lastName"
							required
						/>
					</Box>
					<Box margin={1}>
						<Field
							component={TextField}
							type="text"
							label="Имя"
							name="firstName"
							required
						/>
					</Box>
					<Box margin={1}>
						<Field
							component={TextField}
							type="text"
							label="Отчество"
							name="surName"
							required
						/>
					</Box>

					<Box margin={2}>
						<FormLabel component="legend">День рождения</FormLabel>
						<Field component={TextField} type="date" name="birthday" />
					</Box>

					<Box margin={2}>
						<FormLabel component="legend">Пол</FormLabel>
						<Field component={RadioGroup} name="gender">
							{genders.map((gender) => (
								<FormControlLabel
									value={gender.value}
									label={gender.label}
									labelPlacement="end"
									control={<Radio disabled={formikBag.isSubmitting} />}
									disabled={formikBag.isSubmitting}
								/>
							))}
						</Field>
					</Box>

					<Box margin={1}>
						<Field
							component={TextField}
							type="text"
							name="position"
							label="должность"
							select
							variant="standard"
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
						>
							{getOptionsFromEnum(EPosition).map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Field>
					</Box>

					<Box margin={1}>
						<FormLabel component="legend">Уволен</FormLabel>
						<Field component={Checkbox} name="dismissed" />
					</Box>

					<Box margin={1}>
						<Field
							name="colleagues"
							multiple
							component={Autocomplete}
							options={employeeStore.possibleColleagues}
							getOptionLabel={(option: IEmploee) => employeeStore.getFullName(option)}
							style={{width: 300}}
							renderInput={(params: AutocompleteRenderInputParams) => (
								<MuiTextField {...params} label="Autocomplete" variant="outlined" />
							)}
						/>
					</Box>

					<Box margin={1}>
						<Button
							type="submit"
							classes={{root: `${!isFormChanged ? 'disabled-btn' : ''}`}}
							variant="contained"
							color="primary"
							disabled={formikBag.isSubmitting && !isFormChanged}
							// onClick={submitForm}
						>
							{initialValues.id ? 'Сохранить' : 'Добавить'}
						</Button>
					</Box>
				</Form>
			)}
		/>
		// </Formik>
	);
});

export {EmployeeForm};
