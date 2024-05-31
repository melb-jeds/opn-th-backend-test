import * as jwt from 'jsonwebtoken'
import User from 'src/applications/domains/models/user.model'
import { JwtService as IJwtService } from 'src/applications/ports/services/jwt.service'

export class JwtService implements IJwtService {
	verify(token: string, privateKey: string): Partial<User> {
		const user = jwt.verify(token, privateKey)
		return user as User
	}

	sign(body: object, privateKey: string): string {
		return jwt.sign(body, privateKey, { expiresIn: '1d' })
	}
}
