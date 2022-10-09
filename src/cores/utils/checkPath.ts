export interface UrlPath {
  pathname?: string
  action?: string
  isAdd: boolean
  isEdit: boolean
  isView: boolean
}

export const ACTION_LIST = 'list'
export const ACTION_ADD = 'add'
export const ACTION_EDIT = 'edit'
export const ACTION_DEFAULT = ACTION_LIST

export const checkPath = (pathname: string | undefined | null): UrlPath => {
  const path = pathname || ''

  let pathnames = path ? path.split('/') : []
  if (pathnames[0] === '') {
    pathnames = pathnames.splice(1, pathnames.length)
  }

  const action = pathnames[pathnames.length - 1]
  let isAdd = false
  let isEdit = false
  let isView = false

  if (action === ACTION_ADD) {
    isAdd = true
  } else if (action === ACTION_EDIT) {
    isEdit = true
  } else {
    isView = true
  }

  return { pathname: pathnames[0], action, isAdd, isEdit, isView }
}

export default checkPath

