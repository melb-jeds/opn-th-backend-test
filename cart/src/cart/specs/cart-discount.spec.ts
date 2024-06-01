import { AddDiscountCommand } from '../../commands/add-discount.command'
import { ProductTable } from '../../tables/product.table'
import Cart from '../cart'

describe('Cart Discount', () => {
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

	it('should discount with fixed amount', () => {
		const product = productTable['1']
		const quantity = 1
		const discountAmount = 50
		const discount: AddDiscountCommand = {
			name: 'promotion-code',
			type: {
				name: 'fixed',
				amount: discountAmount,
			},
		}

		cart.add({ productId: product.id, quantity })
		const total = cart.total()
		cart.addDiscount(discount)
		const discountedTotal = cart.total()

		expect(discountedTotal).toBe(total - discountAmount)
	})

	it('should discount with fixed until 0', () => {
		const product = productTable['1']
		const quantity = 1
		const discountAmount = 1000000
		const discount: AddDiscountCommand = {
			name: 'promotion-code',
			type: {
				name: 'fixed',
				amount: discountAmount,
			},
		}

		cart.add({ productId: product.id, quantity })
		cart.addDiscount(discount)
		const discountedTotal = cart.total()

		expect(discountedTotal).toBe(0)
	})

	it('should discount with percentage', () => {
		const product = productTable['1']
		const quantity = 1
		const discountAmount = 50
		const discount: AddDiscountCommand = {
			name: 'promotion-code',
			type: {
				name: 'percentage',
				amount: discountAmount,
				max: product.price,
			},
		}

		cart.add({ productId: product.id, quantity })
		const total = cart.total()
		cart.addDiscount(discount)
		const discountedTotal = cart.total()

		expect(discountedTotal).toBe(total / 2)
	})

	it('should discount with percentage but not exceed max', () => {
		const product = productTable['1']
		const quantity = 1
		const discountAmount = 50
		const discount: AddDiscountCommand = {
			name: 'promotion-code',
			type: {
				name: 'percentage',
				amount: discountAmount,
				max: 30,
			},
		}

		cart.add({ productId: product.id, quantity })
		const total = cart.total()
		cart.addDiscount(discount)
		const discountedTotal = cart.total()

		expect(discountedTotal).toBe(total - 30)
	})
})
