export const DefaultLimit = 10
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OnClickType = any

// STATUS
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETE: 'delete',
  ALL: 'all',
  PENDING: 'pending',
  APPROVED: 'approved',
  DRAFT: 'draft',
  SUSPEND: 'suspend',
}

export enum EStatus {
  active = 'Active',
  inactive = 'Inactive',
  delete = 'Delete',
  all = 'All',
  pending = 'Pending',
  approved = 'Approved',
  draft = 'Draft',
}

export const SelectStatusTag = {
  [STATUS.ACTIVE]: { text: 'STATUS_ACTIVE' },
  [STATUS.INACTIVE]: { text: 'STATUS_INACTIVE' },
  [STATUS.DELETE]: { text: 'STATUS_DELETE' },
  [STATUS.ALL]: { text: 'STATUS_ALL' },
  [STATUS.PENDING]: { text: 'STATUS_PENDING' },
  [STATUS.DRAFT]: { text: 'STATUS_DRAFT' },
  [STATUS.APPROVED]: { text: 'STATUS_APPROVED' },
  [STATUS.SUSPEND]: { text: 'STATUS_SUSPEND' },
}

export const SelectAddStatus = [
  {
    name: SelectStatusTag[STATUS.ACTIVE]?.text,
    value: STATUS.ACTIVE,
  },
  {
    name: SelectStatusTag[STATUS.INACTIVE]?.text,
    value: STATUS.INACTIVE,
  },
  {
    name: SelectStatusTag[STATUS.DELETE]?.text,
    value: STATUS.DELETE,
  },
]

export const SelectAllStatus = [
  {
    name: SelectStatusTag[STATUS.ALL]?.text,
    value: STATUS.ALL,
  },
].concat(SelectAddStatus)

export const SelectCarStatus = [
  {
    name: SelectStatusTag[STATUS.PENDING]?.text,
    value: STATUS.PENDING,
  },
  {
    name: SelectStatusTag[STATUS.APPROVED]?.text,
    value: STATUS.APPROVED,
  },
  {
    name: SelectStatusTag[STATUS.DRAFT]?.text,
    value: STATUS.DRAFT,
  },
]

export const SelectAllCarStatus = [
  {
    name: SelectStatusTag[STATUS.ALL]?.text,
    value: STATUS.ALL,
  },
].concat(SelectCarStatus)

export const SelectCompanyStatus = [
  {
    name: SelectStatusTag[STATUS.ACTIVE]?.text,
    value: STATUS.ACTIVE,
  },
  {
    name: SelectStatusTag[STATUS.SUSPEND]?.text,
    value: STATUS.SUSPEND,
  },
]

export const SelectAllCompanyStatus = [
  {
    name: SelectStatusTag[STATUS.ALL]?.text,
    value: STATUS.ALL,
  },
].concat(SelectCompanyStatus)

export const dateFormats = {
  year: 'BBBB',
  monthAndYear: 'MMMM BBBB',
}

