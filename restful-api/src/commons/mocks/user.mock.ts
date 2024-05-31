import * as dayjs from 'dayjs'
import User from 'src/applications/domains/models/user.model'
import { GenderEnum } from 'src/commons/enums/gender.enum'

export const MockUser: User = {
	id: '1717168894471',
	name: 'John Doe',
	email: 'john@example.com',
	password: '12345',
	birthDate: dayjs('2016-09-18T17:34:02.666Z').toDate(),
	gender: GenderEnum.Male,
	address: '123 Main St, City, Country',
	isNewsletter: true,
	createdAt: dayjs().toDate(),
	updatedAt: dayjs().toDate(),
	deletedAt: null,
}
