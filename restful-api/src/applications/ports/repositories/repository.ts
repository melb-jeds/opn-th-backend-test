import { IRepositoryOptions, IRepositoryUpdateOptions } from 'src/commons/interfaces/repository-options.interface'

export interface Repository<T> {
	create(command: Partial<T>, options?: IRepositoryOptions): Promise<T>
	findAll(options?: IRepositoryOptions): Promise<T[]>
	findById(id: string, options?: IRepositoryOptions): Promise<T | null>
	updateById(id: string, command: Partial<T>, options?: IRepositoryUpdateOptions): Promise<void>
	deleteById(id: string, options?: IRepositoryOptions): Promise<void>
}
