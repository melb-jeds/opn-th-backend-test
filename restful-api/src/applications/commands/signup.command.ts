import { GenderEnum } from 'src/commons/enums/gender.enum'

export interface SignupCommand {
	name: string
	email: string
	password: string
	birthDate: Date
	gender: GenderEnum
	address: string
	isNewsletter: boolean
}
