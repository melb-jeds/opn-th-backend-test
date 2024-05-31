import { IsBoolean, IsDateString, IsDefined, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { GenderEnum } from 'src/commons/enums/gender.enum'

export class SignupValidation {
	@IsDefined()
	@IsNotEmpty()
	@IsEmail()
	@IsString()
	email: string

	@IsDefined()
	@IsNotEmpty()
	@IsString()
	password: string

	@IsDefined()
	@IsNotEmpty()
	@IsString()
	name: string

	@IsDefined()
	@IsNotEmpty()
	@IsDateString()
	birthDate: Date

	@IsDefined()
	@IsNotEmpty()
	@IsEnum(GenderEnum)
	gender: GenderEnum

	@IsDefined()
	@IsString()
	address: string

	@IsDefined()
	@IsNotEmpty()
	@IsBoolean()
	isNewsletter: boolean
}
