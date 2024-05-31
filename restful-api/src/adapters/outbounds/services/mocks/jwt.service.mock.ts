import { JwtService } from 'src/adapters/outbounds/services/jwt.service'
import User from 'src/applications/domains/models/user.model'
import { MockUser } from 'src/commons/mocks/user.mock'

export class JwtServiceMock extends JwtService {
	override verify(token: string, privateKey: string): Partial<User> {
		const { JWT_TOKEN_MOCK } = process.env
		if (token === JWT_TOKEN_MOCK) return MockUser
		else return super.verify(token, privateKey)
	}
}
