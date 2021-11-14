import { useFetch } from 'app/hooks/useFetch';
import { ExpenseRequest, ExpenseResponse } from 'app/types/expense';
import { createOrUpdateExpense, getExpenseById } from 'app/apis/expenseClient';
import { Button, Card, CardContent, CircularProgress, FormControl, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { CreateOrUpdateWrapper } from 'app/components/CreateOrUpdateWrapper';
import * as yup from 'yup';
import { InputFormik } from 'app/components/inputs/InputFormik';
import { toast } from 'react-toastify';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { Categories } from 'app/store/categorySlice';
import { useSelector } from 'react-redux';
interface IProps<T> {
  id: number | null;
  save: (newItem: T) => void;
  close: () => void;
  visibility: boolean;
}

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  value: yup.number().min(0, 'Value must be more than zero').required('Value is required'),
  categoryId: yup.number().min(1, 'Category is required'),
});

export const CreatedOrUpdatedExpensePage = ({ id, save, close, visibility }: IProps<unknown>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { loading: loadingExpense, data } = useFetch<ExpenseResponse | null>(
    async () => (id ? await getExpenseById(id) : null),
    [id, visibility]
  );

  useEffect(() => {
    formik.resetForm();
    if (id && data) {
      formik.setValues(data);
    }
  }, [data]);

  const listCategories = useSelector(Categories);
  const formik = useFormik<ExpenseRequest>({
    initialValues: data
      ? { ...data }
      : {
          categoryId: 0,
          title: '',
          value: 0,
        },
    validationSchema: validationSchema,
    onSubmit: async (values: ExpenseRequest) => {
      try {
        setLoading(true);
        const result = await createOrUpdateExpense(id, values);
        toast.info(`Create or Update expense successfully`);
        save(result);
      } catch (err) {
        toast.error('There is an error creating or updating');
      }
      setLoading(false);
    },
  });
  return (
    <>
      <CreateOrUpdateWrapper visibility={visibility}>
        {loadingExpense && id ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
            <Grid item md={8} xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {id ? 'Update' : 'Create'} Expense
                  </Typography>
                  <form onSubmit={formik.handleSubmit}>
                    <InputFormik name="title" formik={formik} />
                    <InputFormik name="value" formik={formik} type="number" />
                    <InputFormik
                      label={'Category'}
                      name="categoryId"
                      formik={formik}
                      type="select"
                      option={{ label: 'title', value: 'id', items: listCategories }}
                    />
                    <FormControl variant="standard" fullWidth={true} margin={'normal'}>
                      <LoadingButton
                        color="primary"
                        variant="contained"
                        fullWidth
                        type="submit"
                        loading={loading}
                        loadingPosition="end"
                        endIcon={<SaveIcon />}
                      >
                        Save
                      </LoadingButton>
                    </FormControl>
                    <FormControl variant="standard" fullWidth={true} margin={'normal'}>
                      <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          formik.resetForm();
                          close();
                        }}
                      >
                        Close
                      </Button>
                    </FormControl>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </CreateOrUpdateWrapper>
    </>
  );
};
