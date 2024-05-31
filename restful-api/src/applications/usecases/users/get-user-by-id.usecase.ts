import { Inject, Injectable } from '@nestjs/common'
import * as _ from 'lodash'
import { IdCommand } from 'src/applications/commands/id.command'
import User from 'src/applications/domains/models/user.model'
import { UserRepository } from 'src/applications/ports/repositories/user.repository'
import { UserNotFoundException } from 'src/commons/exceptions/users/user-not-found.exception'

@Injectable()
export class GetUserByIdUsecase {
	constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

	public async handle(command: IdCommand): Promise<User> {
		const user = await this.userRepository.findById(command.id)
		if (_.isEmpty(user)) throw new UserNotFoundException()

		return user
	}
}
