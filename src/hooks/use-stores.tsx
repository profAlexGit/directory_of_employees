import {useContext} from 'react';
import {rootStoreContext} from '../stores/index';

export const useStores = () => useContext(rootStoreContext);