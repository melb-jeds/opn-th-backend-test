import { ProductTable } from '../../tables/product.table'
import { Product } from '../../types/product.type'
import Cart from '../cart'

describe('Cart Utilities', () => {
	let productTable: ProductTable
	let cart: Cart

	beforeEach(() => {
		productTable = {
			1: {
				id: '1',
				price: 100,
			},
			2: {
				id: '2',
				price: 200,
			},
		}
		cart = Cart.create({ customerId: '1', productTable })
	})

	it('should check if product exists', () => {
		const product: Product = productTable['1']
		const quantity = 10

		cart.add({ productId: product.id, quantity })

		const has = cart.has({ id: product.id })
		expect(has).toBe(true)
	})

	it('should return empty when cart is empty', () => {
		const isEmpty = cart.isEmpty()

		expect(isEmpty).toBe(true)
	})

	it("should not return empty when cart isn't empty", () => {
		const product: Product = productTable['1']
		const quantity = 10

		cart.add({ productId: product.id, quantity })

		const isEmpty = cart.isEmpty()
		expect(isEmpty).toBe(false)
	})

	it('should return product list', () => {
		const quantity = 1
		const products = Object.values(productTable).map((product) => ({ productId: product.id, quantity }))

		products.map(({ productId, quantity }) => cart.add({ productId, quantity }))

		const count = cart.count()
		expect(count).toEqual(products)
	})

	it('should return total price', () => {
		const quantity = 1
		const products = Object.values(productTable)
		const totalPrice = products.reduce((sum, product) => (sum += product.price * quantity), 0)

		products.map((product) => cart.add({ productId: product.id, quantity }))

		const total = cart.total()
		expect(total).toBe(totalPrice)
	})
})
