import { ExpenseResponse } from 'app/types/expense';
import { UserRequest, UserResponse } from 'app/types/user';
import { fetchAsync } from '../utils/fetch';

export const toUrlSearchParams = (query: any) => {
  const urlParams = new URLSearchParams(query);
  let keysForDel = [];
  urlParams.forEach((v, k) => {
    if (v === null || v === 'null') keysForDel.push(k);
  });
  keysForDel.forEach((k) => {
    urlParams.delete(k);
  });
  return urlParams.toString();
};

const baseApi = process.env.REACT_APP_BASE_API_URL;
export const createUser = (user: UserRequest): Promise<UserResponse> =>
  fetchAsync(`${baseApi}/api/user`, {
    method: 'POST',
    body: user,
  });

export const getUserByEmail = (email: string): Promise<UserResponse[]> =>
  fetchAsync(`${baseApi}/api/user?${toUrlSearchParams({ email })}`);

export const getYoutube = (id: string): Promise<any> => {
  const getInfoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&fields=items/snippet/title,items/snippet/description&key=AIzaSyDSzW_JcVmEioQrG0Oab_DPJxso1UOPP4U`;
  return fetchAsync(getInfoUrl);
};
