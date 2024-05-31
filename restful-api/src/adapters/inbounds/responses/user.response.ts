import { Exclude, Expose } from 'class-transformer'
import { GenderEnum } from 'src/commons/enums/gender.enum'
import { Nullable } from 'src/commons/types/nullable.type'

export class UserResponse {
	@Expose()
	id: string

	@Expose()
	name: string

	@Expose()
	email: string

	@Exclude()
	password: string

	@Expose()
	birthDate: Date

	@Expose()
	gender: GenderEnum

	@Expose()
	address: string

	@Expose()
	isNewsletter: boolean

	@Expose()
	createdAt: Date

	@Expose()
	updatedAt: Date

	@Expose()
	deletedAt: Nullable<Date>
}
