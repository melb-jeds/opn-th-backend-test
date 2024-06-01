export class ProductCartNotFoundException extends Error {
	constructor(id: string) {
		super(`productId ${id} cannot be found in cart`)
	}
}
