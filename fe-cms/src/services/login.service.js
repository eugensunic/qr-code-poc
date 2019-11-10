export function isEmailValid(mail) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(mail).toLowerCase());
}

export function isEmpty(param) {
  return !param;
}

export function isPasswordLessThan5(password) {
  return password.length < 5;
}

export function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}
