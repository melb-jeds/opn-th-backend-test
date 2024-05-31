import { Global, Module } from '@nestjs/common'
import { RepositoryModule } from 'src/adapters/outbounds/repositories/repository.module'
import { ServiceModule } from 'src/adapters/outbounds/services/service.module'

@Global()
@Module({
	imports: [ServiceModule, RepositoryModule],
})
export class OutboundModule {}
