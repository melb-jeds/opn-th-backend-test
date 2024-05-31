import { ClassConstructor, ClassTransformOptions, plainToInstance } from 'class-transformer'
import * as _ from 'lodash'

export const CONFIG: ClassTransformOptions = {
	excludeExtraneousValues: true,
}

export const responseObjToClass = <T, V>(cls: ClassConstructor<T>, plain: V): T => {
	if (_.isEmpty(plain)) return null
	return plainToInstance(cls, plain, CONFIG)
}

export const responseMapToClass = <T, V>(cls: ClassConstructor<T>, plain: V[]): T[] => {
	if (_.isEmpty(plain)) return []
	return plain.map((item) => plainToInstance(cls, item, CONFIG))
}
