export interface IMenuItem {
  name: string
  isActive?: boolean
  link: string
}

export interface IMenuProps {
  value: IMenuItem[]
}

