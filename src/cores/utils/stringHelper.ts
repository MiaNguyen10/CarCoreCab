export function toRegisterName(name: string) {
  const registerName = name.toLowerCase().replace(' ', '-')

  return registerName
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

