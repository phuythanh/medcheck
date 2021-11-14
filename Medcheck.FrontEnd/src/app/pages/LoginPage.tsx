import { getToken } from 'app/apis/authClient';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { authorized, addToken, emailLoggedIn } from '../store/authSlice';
import { useHistory } from 'react-router';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { InputFormik } from '../components/inputs/InputFormik';

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password should be of minimum 8 characters length').required('Password is required'),
});

export const LoginPage = () => {
  const history = useHistory();
  const isAuthorized = useSelector(authorized);
  const email = useSelector(emailLoggedIn);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await getToken(values);
        dispatch(addToken({ token: result.token, email: result.email }));
        toast.info(`Logged in successfully`);
        history.push('/');
      } catch (err) {
        toast.error('wrong email or password');
      }
    },
  });

  if (isAuthorized) {
    history.push('/');
    return null;
  }

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
      <Grid md={8}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Login
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <InputFormik name="email" formik={formik} />
              <InputFormik type="password" name="password" formik={formik} />
              <Button color="primary" variant="contained" fullWidth type="submit">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
