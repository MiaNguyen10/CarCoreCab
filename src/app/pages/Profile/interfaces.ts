import { Dispatch, SetStateAction } from 'react'
import { VoidFunction } from 'cores/utils/commonType'

export interface IProfileForm {
  email?: string
  firstName: string
  lastName: string
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

export interface IConfirmDialog {
  isOpenDialog: boolean
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
  handleSuccessDialog: VoidFunction
}

export interface ISuccessDialog {
  isOpenDialog: boolean
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
}

