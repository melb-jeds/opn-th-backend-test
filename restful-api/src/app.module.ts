import { Module } from '@nestjs/common'
import { AdapterModule } from 'src/adapters/adapter.module'
import { ApplicationModule } from 'src/applications/application.module'

@Module({
	imports: [ApplicationModule, AdapterModule],
})
export class AppModule {}
