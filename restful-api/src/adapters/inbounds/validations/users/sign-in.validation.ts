import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SignInValidation {
	@IsDefined()
	@IsNotEmpty()
	@IsEmail()
	@IsString()
	email: string

	@IsDefined()
	@IsNotEmpty()
	@IsString()
	password: string
}
