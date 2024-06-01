import { DiscountType } from '../types/cart.type'

export interface AddDiscountCommand {
	name: string
	type: DiscountType
}
