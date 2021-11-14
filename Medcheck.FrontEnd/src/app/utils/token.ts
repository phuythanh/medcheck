import jwtdecode from 'jwt-decode';
interface IJwtToken {
  id: number;
  exp: number;
  email: string;
}

export const decodedToken = (token: string): IJwtToken => {
  if (!token) return null;
  return jwtdecode<IJwtToken>(token);
};
