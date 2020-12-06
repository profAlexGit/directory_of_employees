import {EPosition} from '../enums/position.enum';

export interface IEmploee {
	id?: string;
	firstName: string;
	lastName: string;
	surName: string;
	position: EPosition;
	birthday?: string;
	gender?: 'male' | 'femail';
	dismissed?: boolean;
	colleagues?: IEmploee[];
}
