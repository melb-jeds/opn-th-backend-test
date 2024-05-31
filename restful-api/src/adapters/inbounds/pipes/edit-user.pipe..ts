import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import * as dayjs from 'dayjs'
import { EditUserValidation } from 'src/adapters/inbounds/validations/users/edit-user.validation'

@Injectable()
export class EditUserPipe implements PipeTransform {
	transform(value: EditUserValidation, metadata: ArgumentMetadata) {
		const birthDate = dayjs(value.birthDate).toDate()

		return {
			...value,
			birthDate,
		}
	}
}
