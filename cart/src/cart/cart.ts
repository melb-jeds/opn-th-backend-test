import { AddDiscountCommand } from '../commands/add-discount.command'
import { AddFreebieCommand } from '../commands/add-freebie.command'
import { AddToCartCommand } from '../commands/add-to-cart.command'
import { CreateCartCommand } from '../commands/create-cart.command'
import { DeleteDiscountCommand } from '../commands/delete-discount.command'
import { DeleteFreebieCommand } from '../commands/delete-freebie.command'
import { EditProductCartCommand } from '../commands/edit-product-cart.command'
import { IdCommand } from '../commands/id.command'
import { DiscountCartNotFoundException } from '../exceptions/discount-cart-not-found.exception'
import { DiscountUsedException } from '../exceptions/discount-used.exception'
import { DuplicateProductIdException } from '../exceptions/duplicate-product-id.exception'
import { FreebieCartNotFoundException } from '../exceptions/freebie-cart-not-found.exception'
import { FreebieUsedException } from '../exceptions/freebie-used.exception'
import { ProductCartNotFoundException } from '../exceptions/product-cart-not-found.exception'
import { ProductNotFoundException } from '../exceptions/product-not-found.exceptions'
import { ProductTable } from '../tables/product.table'
import { CartProduct, DiscountInCart, FreebieContainsCondition, FreebieContainsReward, FreebieInCart, ProductInCart } from '../types/cart.type'
import * as _ from 'lodash'

export default class Cart {
	private products: ProductInCart = {}
	private discounts: DiscountInCart = {}
	private freebies: FreebieInCart = {}
	private freebieProducts: ProductInCart = {}

	constructor(private readonly customerId: string, private readonly productTable: ProductTable) {}

	public static create(command: CreateCartCommand): Cart {
		return new Cart(command.customerId, command.productTable)
	}

	public add(command: AddToCartCommand): void {
		const inTable = this.productTable[command.productId]
		if (_.isEmpty(inTable)) throw new ProductNotFoundException(command.productId)

		const product = this.products[command.productId]
		if (!_.isEmpty(product)) throw new DuplicateProductIdException(command.productId)

		this.products[command.productId] = command
		this._validateFreebie({ id: command.productId })
	}

	public update(command: EditProductCartCommand): void {
		const product = this.products[command.productId]
		if (_.isEmpty(product)) throw new ProductCartNotFoundException(command.productId)

		this.products[command.productId] = {
			...product,
			quantity: command.quantity,
		}
	}

	public remove(command: IdCommand): void {
		const product = this.products[command.id]
		if (_.isEmpty(product)) throw new ProductCartNotFoundException(command.id)

		delete this.products[command.id]
	}

	public destroy(): void {
		this.products = {}
		this.discounts = {}
		this.freebies = {}
		this.freebieProducts = {}
	}

	public has(command: IdCommand): boolean {
		const product = this.products[command.id]
		return !_.isEmpty(product)
	}

	public isEmpty(): boolean {
		return _.isEmpty(this.products)
	}

	public count(): CartProduct[] {
		const products = Object.values(this.products)
		const result = this._activateFreebie(products)
		return result
	}

	public quantity(): number {
		const products = Object.values(this.products)
		const productsWithFreebies = this._activateFreebie(products)
		const count = productsWithFreebies.reduce((sum, product) => (sum += product.quantity), 0)
		return count
	}

	public total(): number {
		const products = Object.values(this.products)
		const sumPrice = products.reduce((sum, product) => {
			const productPrice = this.productTable[product.productId].price
			return sum + productPrice * product.quantity
		}, 0)

		const total = this._activateDiscount(sumPrice)
		return total
	}

	public addDiscount(command: AddDiscountCommand): void {
		const discount = this.discounts[command.name]
		if (!_.isEmpty(discount)) throw new DiscountUsedException(command.name)

		this.discounts[command.name] = command
	}

	public removeDiscount(command: DeleteDiscountCommand): void {
		const discount = this.discounts[command.name]
		if (_.isEmpty(discount)) throw new DiscountCartNotFoundException(command.name)

		delete this.discounts[command.name]
	}

	public addFreebie(command: AddFreebieCommand): void {
		const freebie = this.freebies[command.name]
		if (!_.isEmpty(freebie)) throw new FreebieUsedException(command.name)

		this.freebies[command.name] = command
	}

	public removeFreebie(command: DeleteFreebieCommand): void {
		const freebie = this.freebies[command.name]
		if (_.isEmpty(freebie)) throw new FreebieCartNotFoundException(command.name)

		delete this.freebies[command.name]
	}

	private _activateDiscount(total: number): number {
		let result = total

		const discounts = Object.values(this.discounts)
		discounts.forEach((discount) => {
			switch (discount.type.name) {
				case 'fixed':
					result = this._handleDiscountFixed(total, discount.type.amount)
					break
				case 'percentage':
					result = this._handleDiscountPercentage(total, discount.type.amount, discount.type.max)
					break
				default:
					break
			}
		})

		return result
	}

	private _handleDiscountFixed(total: number, amount: number): number {
		const discounted = total - amount
		if (discounted < 0) return 0
		else return discounted
	}

	private _handleDiscountPercentage(total: number, percentage: number, max: number): number {
		if (percentage > 100) percentage = 100

		let discount = (total / 100) * percentage
		if (discount > max) discount = max

		return total - discount
	}

	private _activateFreebie(products: CartProduct[]): CartProduct[] {
		const productIntersects = products.map((product) => {
			const freebie = this.freebieProducts[product.productId]
			if (_.isEmpty(freebie)) return product
			else
				return {
					...product,
					quantity: product.quantity + freebie.quantity,
				}
		})
		const productIds = productIntersects.map((product) => product.productId)
		const freebieOnly = Object.values(this.freebieProducts).filter((freebie) => !productIds.includes(freebie.productId))

		return _.flatten([productIntersects, freebieOnly])
	}

	private _validateFreebie(command: IdCommand): void {
		const freebies = Object.values(this.freebies)
		freebies.forEach((freebie) => {
			switch (freebie.condition.type) {
				case 'contains':
					this._handleFreebieContains(command.id, freebie.condition, freebie.reward)
					break
				default:
					break
			}
		})
	}

	private _handleFreebieContains(productId: string, condition: FreebieContainsCondition, reward: FreebieContainsReward): void {
		if (productId !== condition.productId) return

		const freebieProduct = this.freebieProducts[reward.productId]
		if (_.isEmpty(freebieProduct)) {
			this.freebieProducts[reward.productId] = reward
		} else {
			this.freebieProducts[reward.productId] = {
				...freebieProduct,
				quantity: freebieProduct.quantity + reward.quantity,
			}
		}
	}
}
