import { useFetch } from 'app/hooks/useFetch';
import { ExpenseResponse } from 'app/types/expense';
import { fetchExpenses } from 'app/apis/expenseClient';
import { Box, Button, CircularProgress, Modal, Table, TableHead, TableRow } from '@mui/material';
import { DataGrid, GridValueFormatterParams } from '@mui/x-data-grid';
import React from 'react';
import moment from 'moment';
import { DATE_FORMAT } from 'app/common/constants';
interface IProps<T> {
  visibility: boolean;
  children: React.ReactNode;
}
export const CreateOrUpdateWrapper = ({ children, visibility }: IProps<unknown>) => {
  return <>{visibility && <Modal open={visibility}>{visibility && <Box>{children}</Box>}</Modal>}</>;
};
