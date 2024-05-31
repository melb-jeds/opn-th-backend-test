export interface EnvService {
	getHashSalt(): number
	getJwtPrivateKey(): string
}
