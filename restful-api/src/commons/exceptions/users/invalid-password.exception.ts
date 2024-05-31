import { HttpException, HttpStatus } from '@nestjs/common'

export class InvalidPasswordException extends HttpException {
	constructor() {
		super('users.invalid-password', HttpStatus.UNPROCESSABLE_ENTITY)
	}
}
