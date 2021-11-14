import { TokenResponse, UserRequest, UserResponse } from 'app/types/user';
import { AxiosResponse } from 'axios';
import { fetchAsync } from '../utils/fetch';
import http from '../utils/httpService';

const baseApi = process.env.REACT_APP_BASE_API_URL;
export const createUser = (user: UserRequest): Promise<UserResponse> =>
  fetchAsync(`${baseApi}/api/user`, {
    method: 'POST',
    body: user,
  });

export const getToken = async (request: UserRequest): Promise<TokenResponse> => {
  const result: AxiosResponse<TokenResponse> = await http.post(`${baseApi}/api/auth/token`, request);
  return result.data;
};
