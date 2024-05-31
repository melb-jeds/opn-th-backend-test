import { IsBoolean, IsDateString, IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { GenderEnum } from 'src/commons/enums/gender.enum'

export class EditUserValidation {
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
