import { Inject, Injectable } from '@nestjs/common'
import * as _ from 'lodash'
import { SignupCommand } from 'src/applications/commands/signup.command'
import { UserFactory } from 'src/applications/factories/user.factory'
import { UserRepository } from 'src/applications/ports/repositories/user.repository'
import { EnvService } from 'src/applications/ports/services/env.service'
import { HashService } from 'src/applications/ports/services/hash.service'
import { EmailExistsException } from 'src/commons/exceptions/users/email-exists.exception'

@Injectable()
export class SignupUsecase {
	constructor(
		@Inject('EnvService') private readonly envService: EnvService,
		@Inject('HashService') private readonly hashService: HashService,
		@Inject('UserRepository') private readonly userRepository: UserRepository
	) {}

	public async handle(command: SignupCommand): Promise<void> {
		await this.validate(command)

		const { password, ...userInfo } = command
		const hashedPassword = this.hashService.hash(password, this.envService.getHashSalt())

		const factory = UserFactory.create({
			...userInfo,
			password: hashedPassword,
		})
		await this.userRepository.create(factory)
	}

	private async validate(command: SignupCommand): Promise<void> {
		const user = await this.userRepository.findByEmail(command.email)
		if (!_.isEmpty(user)) throw new EmailExistsException()
	}
}
