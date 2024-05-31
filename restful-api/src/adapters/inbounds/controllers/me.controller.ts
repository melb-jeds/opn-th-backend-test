import { Body, Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/adapters/inbounds/guards/jwt-auth.guard'
import { EditUserPipe } from 'src/adapters/inbounds/pipes/edit-user.pipe.'
import { UserResponse } from 'src/adapters/inbounds/responses/user.response'
import { EditUserValidation } from 'src/adapters/inbounds/validations/users/edit-user.validation'
import { ResetPasswordValidation } from 'src/adapters/inbounds/validations/users/reset-password.validation'
import User from 'src/applications/domains/models/user.model'
import { ChangeUserPasswordUsecase } from 'src/applications/usecases/users/change-user-password.usecase'
import { DeleteUserByIdUsecase } from 'src/applications/usecases/users/delete-user-by-id.usecase'
import { EditUserByIdUsecase } from 'src/applications/usecases/users/edit-user-by-id.usecase'
import { GetUserByIdUsecase } from 'src/applications/usecases/users/get-user-by-id.usecase'
import { UserRequest } from 'src/commons/decorators/user-request.decorator'
import { responseObjToClass } from 'src/commons/helpers/response.helper'

@UseGuards(JwtAuthGuard)
@Controller({
	path: 'me',
	version: '1',
})
export class MeController {
	constructor(
		private readonly getUserByIdUsecase: GetUserByIdUsecase,
		private readonly editUserByIdUsecase: EditUserByIdUsecase,
		private readonly changeUserPasswordUsecase: ChangeUserPasswordUsecase,
		private readonly deleteUserByIdUsecase: DeleteUserByIdUsecase
	) {}

	@Get()
	public async find(@UserRequest() userReq: User) {
		const user = await this.getUserByIdUsecase.handle({
			id: userReq.id,
		})

		return {
			data: responseObjToClass(UserResponse, user),
		}
	}

	@Patch()
	public async edit(@UserRequest() userReq: User, @Body(EditUserPipe) payload: EditUserValidation) {
		await this.editUserByIdUsecase.handle({ id: userReq.id, ...payload })
	}

	@Patch('reset-password')
	public async resetPassword(@UserRequest() userReq: User, @Body() payload: ResetPasswordValidation) {
		await this.changeUserPasswordUsecase.handle({
			id: userReq.id,
			...payload,
		})
	}

	@Delete()
	public async delete(@UserRequest() userReq: User) {
		await this.deleteUserByIdUsecase.handle({ id: userReq.id })
	}
}
