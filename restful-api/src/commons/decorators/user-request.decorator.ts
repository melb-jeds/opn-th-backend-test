import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import User from 'src/applications/domains/models/user.model'

export const UserRequest = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	return (request?.user as Partial<User>) || undefined
})
