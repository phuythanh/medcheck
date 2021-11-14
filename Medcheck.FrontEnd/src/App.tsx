import AppHeader from './app/components/Header/AppHeader';
import NotFound from './app/components/NotFound';
import { HomePage } from './app/pages/HomePage';
import { BrowserRouter, Route, RouteProps, Switch, useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { authorized, logout } from './app/store/authSlice';
import { LoginPage } from 'app/pages/LoginPage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Card, Container, Grid } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { ExpenseManagementPage } from 'app/pages/Expense/ExpenseManagementPage';
import { CategoryManagementPage } from 'app/pages/Category/CategoryManagementPage';
import { LogoutPage } from 'app/pages/LogoutPage';
import { fetchCategoriesAsync } from 'app/store/categorySlice';

const UserRoute = ({ children, ...props }: RouteProps) => {
  const isAuthorized = useSelector(authorized);
  return <Route {...props}>{isAuthorized ? children : 'You are not allowed to view this page'}</Route>;
};

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthorized = useSelector(authorized);

  useEffect(() => {
    if (!isAuthorized) {
      history.push('/login');
    }
  }, [history]);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchCategoriesAsync());
    }
  }, [isAuthorized]);

  return (
    <>
      <Switch>
        <Route>
          <Container maxWidth="lg" sx={{ backgroundColor: '#f4f5f8', minHeight: '100vh' }}>
            <Grid>
              <ToastContainer />
              <div>
                <AppHeader />
              </div>
              <Grid sx={{ marginTop: '50px' }}>
                <Switch>
                  <Route exact path="/login">
                    <LoginPage />
                  </Route>
                  <Route>
                    <UserRoute>
                      <Route exact path="/">
                        <HomePage />
                      </Route>
                      <Route exact path="/expense">
                        <ExpenseManagementPage />
                      </Route>
                      <Route exact path="/category">
                        <CategoryManagementPage />
                      </Route>
                      <Route exact path="/logout">
                        <LogoutPage />
                      </Route>
                      {/* <Route component={NotFound} /> */}
                    </UserRoute>
                  </Route>
                </Switch>
              </Grid>
            </Grid>
          </Container>
        </Route>
      </Switch>
    </>
  );
}

export default App;
