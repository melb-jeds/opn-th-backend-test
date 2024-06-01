import { AddFreebieCommand } from '../../commands/add-freebie.command'
import { ProductTable } from '../../tables/product.table'
import Cart from '../cart'

describe('Cart Freebie', () => {
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

	it('contains type should add freebie to cart', () => {
		const product = productTable['1']
		const freebie: AddFreebieCommand = {
			name: 'freebie-campaign',
			condition: {
				type: 'contains',
				productId: '1',
			},
			reward: {
				productId: '2',
				quantity: 1,
			},
		}

		cart.addFreebie(freebie)
		cart.add({
			productId: product.id,
			quantity: 1,
		})

		const quantity = cart.quantity()
		const count = cart.count()
		expect(quantity).toBe(2)
		expect(count).toEqual([
			{
				productId: '1',
				quantity: 1,
			},
			{
				productId: '2',
				quantity: 1,
			},
		])
	})

	it('should not count freebie price', () => {
		const product = productTable['1']
		const freebie: AddFreebieCommand = {
			name: 'freebie-campaign',
			condition: {
				type: 'contains',
				productId: '1',
			},
			reward: {
				productId: '2',
				quantity: 100,
			},
		}

		cart.addFreebie(freebie)
		cart.add({
			productId: product.id,
			quantity: 1,
		})

		const total = cart.total()
		expect(total).toBe(product.price)
	})

	it('should not count freebies price', () => {
		const product = productTable['1']
		const freebie: AddFreebieCommand = {
			name: 'freebie-campaign',
			condition: {
				type: 'contains',
				productId: '1',
			},
			reward: {
				productId: '2',
				quantity: 5,
			},
		}

		cart.addFreebie(freebie)
		cart.add({
			productId: '1',
			quantity: 1,
		})
		cart.add({
			productId: '2',
			quantity: 10,
		})

		const total = cart.total()
		expect(total).toBe(product.price + productTable['2'].price * 10)
	})
})
