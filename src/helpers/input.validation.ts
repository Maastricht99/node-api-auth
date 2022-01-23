//Email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(email);
}

//Password
export const isLongEnough = (password: string): boolean => {
  return password.length >= 8;
}

export const isShortEnough = (password: string): boolean => {
  return password.length <= 200;
}

export const hasLowerLetter = (password: string): boolean => {
  return /[a-z]/.test(password);
}

export const hasUpperLetter = (password: string): boolean => {
  return /[A-Z]/.test(password);
}

export const hasNumber = (password: string): boolean => {
  return /[0-9]/.test(password);
}

export const hasSpecialChar = (password: string): boolean => {
  return /[!£$%&?]/.test(password);
}

