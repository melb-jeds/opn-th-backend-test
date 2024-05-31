import { HttpException, HttpStatus } from '@nestjs/common'

export class InvalidSignInException extends HttpException {
	constructor() {
		super('users.invalid-sign-in', HttpStatus.UNPROCESSABLE_ENTITY)
	}
}
