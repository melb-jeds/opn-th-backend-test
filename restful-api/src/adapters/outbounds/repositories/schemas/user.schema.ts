import { GenderEnum } from 'src/commons/enums/gender.enum'
import { Nullable } from 'src/commons/types/nullable.type'

export class UserSchema {
	id: string
	name: string
	email: string
	password: string
	birthDate: Date
	gender: GenderEnum
	address: string
	isNewsletter: boolean
	createdAt: Date
	updatedAt: Date
	deletedAt: Nullable<Date>
}
