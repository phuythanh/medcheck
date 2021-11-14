import { useState } from 'react';
import { ChangeEvent, SyntheticEvent } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { authorized, emailLoggedIn } from 'app/store/authSlice';
import { UserRequest } from 'app/types/user';
export const AuthInfo = () => {
  const history = useHistory();
  const isAuthorized = useSelector(authorized);
  const email = useSelector(emailLoggedIn);
  const dispatch = useDispatch();
  const [user, setUser] = useState<UserRequest>({
    email: '',
    password: '',
  });
  const shareMovie = (event: SyntheticEvent) => {
    event.preventDefault();
    history.push('/share');
  };

  const showUserInfo = () => (
    <div className="flex space-x-4 con items-center">
      <div>Welcome: {email}</div>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={shareMovie}
      >
        Share a movie
      </button>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        // onClick={doLogout}
      >
        Logout
      </button>
    </div>
  );

  const showLogin = () => (
    <>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        // onClick={doLogout}
      >
        Logout
      </button>
    </>
  );
  return <div className="flex">{!isAuthorized ? showLogin() : showUserInfo()}</div>;
};
