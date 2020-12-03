import {EPosition} from '../enums/position.enum';

export interface IEmploee {
    id: string,
	fullName: string;
	position: EPosition;
	birthday?: string;
	gender?: 'male' | 'femail';
	dismissed?: boolean;
	colleagues?: IEmploee[];
}
