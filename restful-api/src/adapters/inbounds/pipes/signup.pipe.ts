import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import * as dayjs from 'dayjs'
import { SignupValidation } from 'src/adapters/inbounds/validations/users/signup.validation'

@Injectable()
export class SignupPipe implements PipeTransform {
	transform(value: SignupValidation, metadata: ArgumentMetadata) {
		const birthDate = dayjs(value.birthDate).toDate()

		return {
			...value,
			birthDate,
		}
	}
}
