import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common'
import { EnvService } from 'src/adapters/outbounds/services/env.service'
import { JwtService } from 'src/applications/ports/services/jwt.service'
import { UnauthorizedException } from 'src/commons/exceptions/users/unauthorized.exception'

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(
		@Inject('JwtService') private readonly jwtService: JwtService,
		@Inject('EnvService') private readonly envService: EnvService
	) {}

	canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest()
		const token = this.extractTokenFromHeader(request)
		if (!token) {
			throw new UnauthorizedException()
		}

		try {
			const payload = this.jwtService.verify(token, this.envService.getJwtPrivateKey())

			request['user'] = payload
			return true
		} catch (error) {
			throw new UnauthorizedException()
		}
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers['authorization']?.split(' ') ?? []
		return type === 'Bearer' ? token : undefined
	}
}
