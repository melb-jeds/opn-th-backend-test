import { Injectable } from '@nestjs/common'
import { UserRepositoryLocal } from 'src/adapters/outbounds/repositories/user.repository.local'
import { MockUser } from 'src/commons/mocks/user.mock'

@Injectable()
export class UserRepositoryLocalMock extends UserRepositoryLocal {
	constructor() {
		super()
		super.create(MockUser)
	}
}
