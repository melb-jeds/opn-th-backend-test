import { Inject, Injectable } from '@nestjs/common'
import * as _ from 'lodash'
import { SignInCommand } from 'src/applications/commands/sign-in.command'
import User from 'src/applications/domains/models/user.model'
import { UserRepository } from 'src/applications/ports/repositories/user.repository'
import { EnvService } from 'src/applications/ports/services/env.service'
import { HashService } from 'src/applications/ports/services/hash.service'
import { JwtService } from 'src/applications/ports/services/jwt.service'
import { InvalidSignInException } from 'src/commons/exceptions/users/invalid-sign-in.exception'

@Injectable()
export class SignInUsecase {
	constructor(
		@Inject('EnvService') private readonly envService: EnvService,
		@Inject('JwtService') private readonly jwtService: JwtService,
		@Inject('HashService') private readonly hashService: HashService,
		@Inject('UserRepository') private readonly userRepository: UserRepository
	) {}

	public async handle(command: SignInCommand): Promise<string> {
		const user = await this.validate(command)

		const isValidPassword = this.hashService.compare(command.password, user.password)
		if (!isValidPassword) throw new InvalidSignInException()

		const { password, ...userWithoutPassword } = user
		const token = this.jwtService.sign(userWithoutPassword, this.envService.getJwtPrivateKey())
		return token
	}

	private async validate(command: SignInCommand): Promise<User> {
		const user = await this.userRepository.findByEmail(command.email)
		if (_.isEmpty(user)) throw new InvalidSignInException()

		return user
	}
}
