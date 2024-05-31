import { Builder } from 'builder-pattern'
import { UserSchema } from 'src/adapters/outbounds/repositories/schemas/user.schema'
import User from 'src/applications/domains/models/user.model'
import { GenderEnum } from 'src/commons/enums/gender.enum'

export class UserSchemaFactory {
	public static create(command: Partial<User>): UserSchema {
		const {
			id = new Date().getTime().toString(),
			name = '',
			email = '',
			password = '',
			birthDate = new Date(),
			gender = GenderEnum.Male,
			address = '',
			isNewsletter = false,
			createdAt = new Date(),
			updatedAt = new Date(),
			deletedAt = null,
		} = command
		return Builder(User)
			.id(id)
			.name(name)
			.email(email)
			.password(password)
			.birthDate(birthDate)
			.gender(gender)
			.address(address)
			.isNewsletter(isNewsletter)
			.createdAt(createdAt)
			.updatedAt(updatedAt)
			.deletedAt(deletedAt)
			.build()
	}
}
