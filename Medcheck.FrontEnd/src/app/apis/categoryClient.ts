import { CategoryRequest, CategoryResponse } from 'app/types/category';
import http from 'app/utils/httpService';
import { AxiosResponse } from 'axios';
import { fetchAsync } from '../utils/fetch';
const baseApi = process.env.REACT_APP_BASE_API_URL;
export const fetchCategories = async (): Promise<CategoryResponse[]> => {
  const result: AxiosResponse<CategoryResponse[]> = await http.get(`${baseApi}/api/Category`);
  return result.data;
};

export const createOrUpdateCategory = async (id: number, request: CategoryRequest): Promise<CategoryResponse> => {
  let result: AxiosResponse<CategoryResponse>;
  if (!id) {
    result = await http.post(`${baseApi}/api/Category`, request);
    return result.data;
  } else {
    result = await http.put(`${baseApi}/api/Category/${id}`, request);
    return result.data;
  }
};

export const deleteCategory = async (CategoryId: number): Promise<CategoryResponse> => {
  const result: AxiosResponse<CategoryResponse> = await http.delete(`${baseApi}/api/Category/${CategoryId}`);
  return result.data;
};

export const getCategoryById = async (CategoryId: number): Promise<CategoryResponse> => {
  const result: AxiosResponse<CategoryResponse> = await http.get(`${baseApi}/api/Category/${CategoryId}`);
  return result.data;
};
