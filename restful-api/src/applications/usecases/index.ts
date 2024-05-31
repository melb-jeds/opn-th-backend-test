import * as _ from 'lodash'
import { ChangeUserPasswordUsecase } from 'src/applications/usecases/users/change-user-password.usecase'
import { DeleteUserByIdUsecase } from 'src/applications/usecases/users/delete-user-by-id.usecase'
import { EditUserByIdUsecase } from 'src/applications/usecases/users/edit-user-by-id.usecase'
import { GetUserByIdUsecase } from 'src/applications/usecases/users/get-user-by-id.usecase'
import { SignInUsecase } from 'src/applications/usecases/users/sign-in.usecase'
import { SignupUsecase } from 'src/applications/usecases/users/signup.usecase'

const users = [SignupUsecase, SignInUsecase, GetUserByIdUsecase, EditUserByIdUsecase, DeleteUserByIdUsecase, ChangeUserPasswordUsecase]

export default _.flatten([users])
