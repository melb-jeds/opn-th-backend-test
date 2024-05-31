import { HashService } from 'src/adapters/outbounds/services/hash.service'
import { MockUser } from 'src/commons/mocks/user.mock'

export class HashServiceMock extends HashService {
	override compare(raw: string, hash: string): boolean {
		if (raw === MockUser.password) return true
		else return super.compare(raw, hash)
	}
}
