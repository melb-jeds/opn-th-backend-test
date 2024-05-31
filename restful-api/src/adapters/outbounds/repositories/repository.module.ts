import { Global, Module } from '@nestjs/common'
import { UserRepositoryLocalMock } from 'src/adapters/outbounds/repositories/mocks/user.repository.local.mock'
import { UserRepositoryLocal } from 'src/adapters/outbounds/repositories/user.repository.local'
import { envModule } from 'src/commons/helpers/env-module.helper'

@Global()
@Module({
	providers: [
		{
			provide: 'UserRepository',
			useClass: envModule({
				development: UserRepositoryLocalMock,
				production: UserRepositoryLocal,
			}),
		},
	],
	exports: ['UserRepository'],
})
export class RepositoryModule {}
