export * from './history';
export const isLoggedIn = () => !!localStorage.getItem('user');
