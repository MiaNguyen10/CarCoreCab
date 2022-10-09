export const phoneRegExp = /^(?:[0-9]{10})?$/
// eslint-disable-next-line max-len
export const passwordRegExp =
  /^(?!.*(\w)\1{2,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+])[A-Za-z\d@$!%*?&#+]{8,}$/i
export const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
export const licensePlateRegExp = /^[1-9]?[ก-ฮ]{1,2} ([1-9][0-9]{0,3})$|^[0-9]{2}-[0-9]{4}$/g
export const nameRegExp = /^[\u0E00-\u0E7Fa-zA-Z ]{1,30}$/g

const regexFormat = {
  phoneRegExp,
  passwordRegExp,
  emailRegExp,
  licensePlateRegExp,
  nameRegExp,
}

export default regexFormat

