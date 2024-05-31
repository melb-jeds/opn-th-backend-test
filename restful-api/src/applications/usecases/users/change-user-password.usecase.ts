import { Inject, Injectable } from '@nestjs/common'
import * as _ from 'lodash'
import { ChangeUserPasswordCommand } from 'src/applications/commands/change-user-password.command'
import User from 'src/applications/domains/models/user.model'
import { UserRepository } from 'src/applications/ports/repositories/user.repository'
import { EnvService } from 'src/applications/ports/services/env.service'
import { HashService } from 'src/applications/ports/services/hash.service'
import { InvalidPasswordException } from 'src/commons/exceptions/users/invalid-password.exception'
import { UserNotFoundException } from 'src/commons/exceptions/users/user-not-found.exception'

@Injectable()
export class ChangeUserPasswordUsecase {
	constructor(
		@Inject('EnvService') private readonly envService: EnvService,
		@Inject('HashService') private readonly hashService: HashService,
		@Inject('UserRepository') private readonly userRepository: UserRepository
	) {}

	public async handle(command: ChangeUserPasswordCommand): Promise<void> {
		const user = await this.validate(command)
		const newPasswordHashed = this.hashService.hash(command.newPassword, this.envService.getHashSalt())

		await this.userRepository.updatePassword(user.id, newPasswordHashed)
	}

	private async validate(command: ChangeUserPasswordCommand): Promise<User> {
		const user = await this.userRepository.findById(command.id)
		if (_.isEmpty(user)) throw new UserNotFoundException()

		const validatePassword = this.hashService.compare(command.oldPassword, user.password)
		if (!validatePassword) throw new InvalidPasswordException()

		return user
	}
}
