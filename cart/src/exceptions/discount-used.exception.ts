export class DiscountUsedException extends Error {
	constructor(id: string) {
		super(`discount ${id} is already used`)
	}
}
