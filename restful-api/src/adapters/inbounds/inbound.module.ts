import { Global, Module } from '@nestjs/common'
import { MeController } from 'src/adapters/inbounds/controllers/me.controller'
import { UserController } from 'src/adapters/inbounds/controllers/user.controller'
import { EditUserPipe } from 'src/adapters/inbounds/pipes/edit-user.pipe.'
import { SignupPipe } from 'src/adapters/inbounds/pipes/signup.pipe'

@Global()
@Module({
	providers: [SignupPipe, EditUserPipe],
	controllers: [UserController, MeController],
})
export class InboundModule {}
