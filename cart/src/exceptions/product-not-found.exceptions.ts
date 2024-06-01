export class ProductNotFoundException extends Error {
	constructor(id: string) {
		super(`productId ${id} cannot be found`)
	}
}
