import { useFetch } from 'app/hooks/useFetch';
import { CategoryRequest, CategoryResponse } from 'app/types/Category';
import { createOrUpdateCategory, getCategoryById } from 'app/apis/categoryClient';
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
  description: yup.string().required('Description is required'),
});

export const CreatedOrUpdatedCategoryPage = ({ id, save, close, visibility }: IProps<unknown>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { loading: loadingCategory, data } = useFetch<CategoryResponse | null>(
    async () => (id ? await getCategoryById(id) : null),
    [id, visibility]
  );

  useEffect(() => {
    formik.resetForm();
    if (id && data) {
      formik.setValues(data);
    }
  }, [data]);

  const listCategories = useSelector(Categories);
  const formik = useFormik<CategoryRequest>({
    initialValues: data
      ? { ...data }
      : {
          title: '',
          description: '',
        },
    validationSchema: validationSchema,
    onSubmit: async (values: CategoryRequest) => {
      try {
        setLoading(true);
        const result = await createOrUpdateCategory(id, values);
        toast.info(`Create or Update Category successfully`);
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
        {loadingCategory && id ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
            <Grid item md={8} xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {id ? 'Update' : 'Create'} Category
                  </Typography>
                  <form onSubmit={formik.handleSubmit}>
                    <InputFormik name="title" formik={formik} />
                    <InputFormik name="description" formik={formik} />
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
