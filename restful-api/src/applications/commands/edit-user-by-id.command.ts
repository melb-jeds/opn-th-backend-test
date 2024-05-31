import { GenderEnum } from 'src/commons/enums/gender.enum'

export interface EditUserByIdCommand {
	id: string
	birthDate: Date
	gender: GenderEnum
	address: string
	isNewsletter: boolean
}
