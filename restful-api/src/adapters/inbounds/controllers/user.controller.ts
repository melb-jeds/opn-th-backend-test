import { Body, Controller, Post } from '@nestjs/common'
import { SignupPipe } from 'src/adapters/inbounds/pipes/signup.pipe'
import { SignInValidation } from 'src/adapters/inbounds/validations/users/sign-in.validation'
import { SignupValidation } from 'src/adapters/inbounds/validations/users/signup.validation'
import { SignInUsecase } from 'src/applications/usecases/users/sign-in.usecase'
import { SignupUsecase } from 'src/applications/usecases/users/signup.usecase'

@Controller({
	path: 'users',
	version: '1',
})
export class UserController {
	constructor(
		private readonly signupUsecase: SignupUsecase,
		private readonly signInUsecase: SignInUsecase
	) {}

	@Post('signup')
	public async signup(@Body(SignupPipe) payload: SignupValidation) {
		await this.signupUsecase.handle(payload)
	}

	@Post('sign-in')
	public async singIn(@Body() payload: SignInValidation) {
		const token = await this.signInUsecase.handle(payload)
		return {
			data: token,
		}
	}
}
