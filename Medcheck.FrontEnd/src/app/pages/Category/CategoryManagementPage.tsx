import { ExpenseResponse } from 'app/types/expense';
import { Box, Button, Card, Grid, IconButton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { deleteItem, insertItem, updateItem } from 'app/utils/tableUtils';
import { CreatedOrUpdatedCategoryPage } from './CreatedOrUpdatedCategoryPage';
import { useDispatch, useSelector } from 'react-redux';
import { Categories, setCategories } from 'app/store/categorySlice';
import { deleteCategory } from 'app/apis/categoryClient';
import { CategoryResponse } from 'app/types/category';

export const CategoryManagementPage = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState<number | null>(null);
  const [visibility, setVisibility] = useState(false);
  const [data, setData] = useState<CategoryResponse[]>([]);
  const listCategories = useSelector(Categories);
  const closeModal = () => {
    setId(null);
    setVisibility(false);
  };

  useEffect(() => {
    setData(listCategories);
  }, [listCategories]);
  const doDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      const newData = deleteItem(id, data);
      setData(newData);
      toast.info(`Delete the category successfully`);
    } catch (err) {
      toast.error('There is an error deleting');
    }
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
      field: 'description',
      headerName: 'Description',
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
            Management Categories
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
          </Card>
        </Grid>
      </Grid>
      <CreatedOrUpdatedCategoryPage
        visibility={visibility}
        id={id}
        save={(newItem: CategoryResponse) => {
          let newData: CategoryResponse[] = [];
          if (id) {
            newData = updateItem(newItem, data);
            setData(newData);
          } else {
            newData = insertItem(newItem, data);
            setData(newData);
          }
          dispatch(setCategories({ items: newData }));

          closeModal();
        }}
        close={() => closeModal()}
      />
    </Box>
  );
};
