import { Injectable } from '@nestjs/common'
import { UserSchemaFactory } from 'src/adapters/outbounds/factories/user-schema.factory'
import { UserSchema } from 'src/adapters/outbounds/repositories/schemas/user.schema'
import User from 'src/applications/domains/models/user.model'
import { UserRepository } from 'src/applications/ports/repositories/user.repository'
import { IRepositoryOptions, IRepositoryUpdateOptions } from 'src/commons/interfaces/repository-options.interface'

@Injectable()
export class UserRepositoryLocal implements UserRepository {
	private store: UserSchema[] = []

	public async create(command: Partial<User>, options?: IRepositoryOptions): Promise<User> {
		const factory = UserSchemaFactory.create(command)
		this.store.push(factory)
		return factory
	}

	public async findAll(options?: IRepositoryOptions): Promise<User[]> {
		return this.store
	}

	public async findById(id: string, options?: IRepositoryOptions): Promise<User | null> {
		const user = this.store.find((user) => user.id === id) || null
		return user
	}

	public async findByEmail(email: string, options?: IRepositoryOptions): Promise<User | null> {
		const user = this.store.find((user) => user.email === email) || null
		return user
	}

	public async updateById(id: string, command: Partial<User>, options?: IRepositoryUpdateOptions): Promise<void> {
		const index = this.store.findIndex((user) => user.id === id)

		if (index === -1) return
		this.store[index] = {
			...this.store[index],
			...command,
		}
	}

	public async updatePassword(id: string, newPassword: string, options?: IRepositoryOptions): Promise<void> {
		const index = this.store.findIndex((user) => user.id === id)

		if (index === -1) return
		this.store[index] = {
			...this.store[index],
			password: newPassword,
		}
	}

	public async deleteById(id: string, options?: IRepositoryOptions): Promise<void> {
		const index = this.store.findIndex((user) => user.id === id)

		if (index === -1) return
		this.store.splice(index, 1)
	}
}
