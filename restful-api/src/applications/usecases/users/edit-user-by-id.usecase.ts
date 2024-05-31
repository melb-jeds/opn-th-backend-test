import { Inject, Injectable } from '@nestjs/common'
import * as _ from 'lodash'
import { EditUserByIdCommand } from 'src/applications/commands/edit-user-by-id.command'
import User from 'src/applications/domains/models/user.model'
import { UserRepository } from 'src/applications/ports/repositories/user.repository'
import { UserNotFoundException } from 'src/commons/exceptions/users/user-not-found.exception'

@Injectable()
export class EditUserByIdUsecase {
	constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

	public async handle(command: EditUserByIdCommand): Promise<void> {
		await this.validate(command)

		const { id, ...body } = command
		await this.userRepository.updateById(id, body)
	}

	private async validate(command: EditUserByIdCommand): Promise<User> {
		const user = await this.userRepository.findById(command.id)
		if (_.isEmpty(user)) throw new UserNotFoundException()

		return user
	}
}
