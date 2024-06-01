import { FreebieContainsCondition, FreebieContainsReward } from '../types/cart.type'

export interface AddFreebieCommand {
	name: string
	condition: FreebieContainsCondition
	reward: FreebieContainsReward
}
