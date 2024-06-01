export class FreebieUsedException extends Error {
	constructor(id: string) {
		super(`freebie ${id} is already used`)
	}
}
