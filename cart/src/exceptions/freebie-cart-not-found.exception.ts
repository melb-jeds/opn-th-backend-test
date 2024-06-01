export class FreebieCartNotFoundException extends Error {
	constructor(id: string) {
		super(`freebie ${id} cannot be found in cart`)
	}
}
