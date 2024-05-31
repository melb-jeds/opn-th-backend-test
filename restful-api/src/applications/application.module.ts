import { Global, Module } from '@nestjs/common'
import usecases from 'src/applications/usecases'

@Global()
@Module({
	providers: usecases,
	exports: usecases,
})
export class ApplicationModule {}
