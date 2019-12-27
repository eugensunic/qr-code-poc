export * from './history';

export const isLoggedIn = () => !!parseCookie('token');

export const getJwtTokenHeader = () => {
  return parseCookie('token').split('.')[0];
};

export const getJwtTokenBody = () => {
  return parseCookie('token').split('.')[1];
};

export const getCurrentDateTimeString = () => {
  const d = new Date();
  const date =
    d.getDate().toString().length === 1
      ? '0' + d.getDate().toString()
      : d.getDate().toString();
  const month =
    (d.getMonth() + 1).toString().length === 1
      ? '0' + (d.getMonth() + 1).toString()
      : (d.getMonth() + 1).toString();
  const year = d.getFullYear();

  const hour =
    d.getHours().toString().length === 1
      ? '0' + d.getHours().toString()
      : d.getHours().toString();
  const minutes =
    d.getMinutes().toString().length === 1
      ? '0' + d.getMinutes().toString()
      : d.getMinutes().toString();

  const MM_DD_YYY__hh_mm =
    month + '/' + date + '/' + year + ', ' + hour + ':' + minutes;
  return MM_DD_YYY__hh_mm;
};

export const parseCookie = param => {
  var nameEQ = param + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const parseJwt = token => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};

export const handleEnterKeyPress = (callback, keyCode) => {
  if (keyCode === 13) {
    callback();
  }
};
