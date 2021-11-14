import { useFetch } from 'app/hooks/useFetch';
import { ExpenseResponse } from 'app/types/expense';
import { deleteExpense, fetchExpenses } from 'app/apis/expenseClient';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  Table,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { DataGrid, GridValueFormatterParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import { DATE_FORMAT } from 'app/common/constants';
import EditIcon from '@mui/icons-material/Edit';
import { green } from '@mui/material/colors';
import { toast } from 'react-toastify';
import { deleteItem, insertItem, updateItem } from 'app/utils/tableUtils';
import { CreatedOrUpdatedExpensePage } from './CreatedOrUpdatedExpensePage';
import { useSelector } from 'react-redux';
import { Categories } from 'app/store/categorySlice';

export const ExpenseManagementPage = () => {
  const [id, setId] = useState<number | null>(null);
  const [visibility, setVisibility] = useState(false);
  const { loading: loadingExpense, data: originalExpense } = useFetch<ExpenseResponse[]>(fetchExpenses);
  const [data, setData] = useState<ExpenseResponse[]>([]);
  const listCategories = useSelector(Categories);
  const closeModal = () => {
    setId(null);
    setVisibility(false);
  };
  useEffect(() => {
    setData(originalExpense);
  }, [originalExpense]);

  const doDelete = async (id: number) => {
    await deleteExpense(id);
    const newData = deleteItem(id, data);
    setData(newData);
    toast.info(`Delete the expense successfully`);
  };

  const doEditing = async (id: number) => {
    setId(id);
    setVisibility(true);
  };

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      editable: false,
    },
    {
      field: 'value',
      headerName: 'Value',
      editable: false,
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      editable: false,
      valueFormatter: (params: any) => {
        return moment(params.value).format(DATE_FORMAT);
      },
    },
    {
      field: 'categoryId',
      headerName: 'Category',
      type: 'number',
      editable: false,
      renderCell: (params: any) => listCategories?.find((c) => c.id === params.row.categoryId)?.title,
    },
    {
      field: 'aa',
      headerName: 'Action',
      sortable: false,
      with: 250,
      // eslint-disable-next-line react/display-name
      renderCell: (params: any) => {
        const row = params.row;
        const onClick = (e) => {};

        return (
          <p>
            <IconButton color="primary" aria-label="edit" size="large" onClick={() => doEditing(row.id)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" size="large" onClick={() => doDelete(row.id)}>
              <DeleteIcon />
            </IconButton>
          </p>
        );
      },
    },
  ];

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
          <Typography variant="h5" component="div">
            Management Expenses
          </Typography>
        </Grid>
        <Grid item md={4} xs={12}>
          <Button
            color="primary"
            fullWidth
            variant="contained"
            onClick={() => {
              setId(null);
              setVisibility(true);
            }}
          >
            Add
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Card>
            {loadingExpense ? (
              <CircularProgress />
            ) : (
              <div>
                <DataGrid
                  rows={data}
                  columns={columns}
                  disableSelectionOnClick
                  disableColumnFilter
                  disableColumnMenu
                  hideFooterPagination
                  autoHeight={true}
                />
              </div>
            )}
          </Card>
        </Grid>
      </Grid>
      <CreatedOrUpdatedExpensePage
        visibility={visibility}
        id={id}
        save={(newItem: ExpenseResponse) => {
          if (id) {
            const newData = updateItem(newItem, data);
            setData(newData);
          } else {
            const newData = insertItem(newItem, data);
            setData(newData);
          }

          closeModal();
        }}
        close={() => closeModal()}
      />
    </Box>
  );
};
