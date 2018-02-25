import { ICENumber } from '../ice-number/ice-number.model';

export class User {
	constructor(public fullName: string,
							public categories: Array<string>,
							public createdEventIds: Array<string>,
							public strikes: number,
							private ICEnumbers: Array<ICENumber>){}

}