import { logout } from '../store/authSlice';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

export const LogoutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  dispatch(logout());
  history.push('/login');
  return null;
};
