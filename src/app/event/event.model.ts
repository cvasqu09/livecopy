export class Event {
	constructor(public eventName: string,
							public categories: Array<string>,
							public numPeople: number,
							public location: Array<number>, // Change this to use geojson eventually?
							public startTime: number,
							public endTime: number,
							public description: string,
							public eventOwner: string,
							public _id: string,
							public reports?: number){}
}