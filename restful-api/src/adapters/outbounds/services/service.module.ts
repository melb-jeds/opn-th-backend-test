import { Global, Module } from '@nestjs/common'
import { EnvService } from 'src/adapters/outbounds/services/env.service'
import { HashService } from 'src/adapters/outbounds/services/hash.service'
import { JwtService } from 'src/adapters/outbounds/services/jwt.service'
import { HashServiceMock } from 'src/adapters/outbounds/services/mocks/hash.service.mock'
import { JwtServiceMock } from 'src/adapters/outbounds/services/mocks/jwt.service.mock'
import { envModule } from 'src/commons/helpers/env-module.helper'

@Global()
@Module({
	providers: [
		{
			provide: 'EnvService',
			useClass: EnvService,
		},
		{
			provide: 'HashService',
			useClass: envModule({
				development: HashServiceMock,
				production: HashService,
			}),
		},
		{
			provide: 'JwtService',
			useClass: envModule({
				development: JwtServiceMock,
				production: JwtService,
			}),
		},
	],
	exports: ['EnvService', 'HashService', 'JwtService'],
})
export class ServiceModule {}
