export * from './history';

export const isLoggedIn = () => !!localStorage.getItem('user');

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
