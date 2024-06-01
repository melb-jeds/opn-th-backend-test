export type CartProduct = {
	productId: string
	quantity: number
}

export type ProductInCart = Record<string, CartProduct>

export type DiscountType =
	| {
			name: 'fixed'
			amount: number
	  }
	| {
			name: 'percentage'
			amount: number
			max: number
	  }

export type Discount = {
	name: string
	type: DiscountType
}

export type DiscountInCart = Record<string, Discount>

export type Freebie = {
	name: string
	condition: FreebieContainsCondition
	reward: FreebieContainsReward
}

export type FreebieContainsCondition = {
	type: 'contains'
	productId: string
}

export type FreebieContainsReward = {
	productId: string
	quantity: number
}

export type FreebieInCart = Record<string, Freebie>
