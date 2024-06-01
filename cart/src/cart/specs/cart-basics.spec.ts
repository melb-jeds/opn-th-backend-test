import { ProductTable, productTable } from '../../tables/product.table'
import { Product } from '../../types/product.type'
import Cart from '../cart'

describe('Cart Basic', () => {
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

	it('should create cart object', () => {
		const customerId = '1'
		const cart = Cart.create({ customerId, productTable })

		expect(cart).toBeInstanceOf(Cart)
	})

	it('should add product to cart', () => {
		const product: Product = productTable['1']
		const quantity = 10

		cart.add({ productId: product.id, quantity })

		const has = cart.has({ id: product.id })
		expect(has).toBe(true)
	})

	it('should update product in cart', () => {
		const product: Product = productTable['1']
		const prevQuantity = 1
		const newQuantity = 10

		cart.add({ productId: product.id, quantity: prevQuantity })
		cart.update({ productId: product.id, quantity: newQuantity })

		const quantity = cart.quantity()
		expect(quantity).toBe(newQuantity)
	})

	it('should remove product from cart', () => {
		const product: Product = productTable['1']
		const quantity = 1

		cart.add({ productId: product.id, quantity })
		cart.remove({ id: product.id })

		const has = cart.has({ id: product.id })
		expect(has).toBe(false)
	})

	it('should destroy cart object', () => {
		const customerId = '1'
		const cart = Cart.create({ customerId, productTable })
		const quantity = 1
		const product: Product = productTable['1']

		cart.add({ productId: product.id, quantity })
		cart.destroy()

		expect(cart.count()).toEqual([])
	})
})
