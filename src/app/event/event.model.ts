export class Event {
	constructor(public eventName: string,
							public categories: Array<string>,
							public numPeople: number,
							public location: string,
							public startTime: number,
							public endTime: number,
							public description: string,
							public eventOwner: string,
							public _id: string){}
}