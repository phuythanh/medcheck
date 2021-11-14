import { ExpenseRequest, ExpenseResponse } from 'app/types/expense';
import http from 'app/utils/httpService';
import { AxiosResponse } from 'axios';
import { fetchAsync } from '../utils/fetch';
const baseApi = process.env.REACT_APP_BASE_API_URL;
export const fetchExpenses = async (userId?: number | null): Promise<ExpenseResponse[]> => {
  const result: AxiosResponse<ExpenseResponse[]> = await http.get(`${baseApi}/api/expense`);
  return result.data;
};

export const createOrUpdateExpense = async (id: number, request: ExpenseRequest): Promise<ExpenseResponse> => {
  let result: AxiosResponse<ExpenseResponse>;
  if (!id) {
    result = await http.post(`${baseApi}/api/expense`, request);
    return result.data;
  } else {
    result = await http.put(`${baseApi}/api/expense/${id}`, request);
    return result.data;
  }
};

export const deleteExpense = async (expenseId: number): Promise<ExpenseResponse> => {
  const result: AxiosResponse<ExpenseResponse> = await http.delete(`${baseApi}/api/expense/${expenseId}`);
  return result.data;
};

export const getExpenseById = async (expenseId: number): Promise<ExpenseResponse> => {
  const result: AxiosResponse<ExpenseResponse> = await http.get(`${baseApi}/api/expense/${expenseId}`);
  return result.data;
};

export const filterExpenses = async (userId?: number | null): Promise<ExpenseResponse[]> => {
  const result: AxiosResponse<ExpenseResponse[]> = await http.get(`${baseApi}/api/expense/filter`);
  return result.data;
};
