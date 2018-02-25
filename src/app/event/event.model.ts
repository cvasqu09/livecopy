export class Event {
	constructor(public eventName: string,
							public categories: Array<string>,
							public numPeople: number,
							public location: string,
							startTime: number,
							endTime: number,
							description: string,
							eventOwner: string){}
}