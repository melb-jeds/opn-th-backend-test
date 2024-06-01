export class DiscountCartNotFoundException extends Error {
	constructor(id: string) {
		super(`discount ${id} cannot be found in cart`)
	}
}
