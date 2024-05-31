import User from 'src/applications/domains/models/user.model'
import { Repository } from 'src/applications/ports/repositories/repository'
import { IRepositoryOptions } from 'src/commons/interfaces/repository-options.interface'

export interface UserRepository extends Repository<User> {
	findByEmail(email: string, options?: IRepositoryOptions): Promise<User | null>
	updatePassword(id: string, newPassword: string, options?: IRepositoryOptions): Promise<void>
}
