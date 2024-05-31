import { Builder } from 'builder-pattern'
import User from 'src/applications/domains/models/user.model'
import { GenderEnum } from 'src/commons/enums/gender.enum'

interface CreateUser {
	name: string
	email: string
	password: string
	birthDate: Date
	gender: GenderEnum
	address: string
	isNewsletter: boolean
}

export class UserFactory {
	public static create(command: CreateUser): User {
		return Builder(User)
			.name(command.name)
			.email(command.email)
			.password(command.password)
			.birthDate(command.birthDate)
			.gender(command.gender)
			.address(command.address)
			.isNewsletter(command.isNewsletter)
			.build()
	}
}
