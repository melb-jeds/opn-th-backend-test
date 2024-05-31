import User from 'src/applications/domains/models/user.model'

export interface JwtService {
	sign(body: object, privateKey: string): string
	verify(token: string, privateKey: string): Partial<User>
}
