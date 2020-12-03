import {createContext} from 'react';
import {EmployeeStore} from './Emploees';

export const rootStoreContext = createContext({
    employeeStore: new EmployeeStore()
});