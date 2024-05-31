import { HttpException, HttpStatus } from '@nestjs/common'

export class EmailExistsException extends HttpException {
	constructor() {
		super('users.email-exists', HttpStatus.UNPROCESSABLE_ENTITY)
	}
}
