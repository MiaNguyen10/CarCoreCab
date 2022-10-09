export function CaseForDay(day: string) {
  switch (day) {
    case 'อา.':
      return 'Su'
    case 'จ.':
      return 'Mo'
    case 'อ.':
      return 'Tu'
    case 'พ.':
      return 'We'
    case 'พฤ.':
      return 'Th'
    case 'ศ.':
      return 'Fr'
    default:
      return 'Sa'
  }
}

