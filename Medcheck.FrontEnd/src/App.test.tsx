import React from 'react';
import App from './App';
import { createMemoryHistory } from 'history';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { render } from 'app/utils/test-utils';
import { Router } from 'react-router-dom';
import * as moveClient from 'app/apis/moveClient';
import { UserResponse } from 'app/types/user';
import * as userClient from 'app/apis/userClient';

afterEach(cleanup);

test('renders learn react link', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );

  expect(getByText(/Funny Movies/i)).toBeInTheDocument();
});

describe('User has not logged in', () => {
  it('Should home page', async () => {
    const fetchMoviesMock = jest.spyOn(moveClient, 'fetchMovies');
    fetchMoviesMock.mockImplementation(() =>
      Promise.resolve([
        {
          userId: 40,
          like: 56,
          dislike: 66,
          url: 'https://www.youtube.com/watch?v=4LPDJWZiBgc',
          createdAt: new Date(),
          title: 'title test',
          description: '------------------------------\n\nĐừng ',
          userName: 'phuythanh@gmail.com',
          youtubeId: '4LPDJWZiBgc',
          id: 1,
        },
      ])
    );
    const history = createMemoryHistory();
    const { getByText, getByPlaceholderText, debug } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    await waitFor(() => expect(getByPlaceholderText('email')).toBeInTheDocument());
    await waitFor(() => expect(getByPlaceholderText('password')).toBeInTheDocument());
    await waitFor(() => expect(getByText(/phuythanh@gmail.com/i)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/title test/i)).toBeInTheDocument());
  });
  it('Should go to Not Found page', async () => {
    const fetchMoviesMock = jest.spyOn(moveClient, 'fetchMovies');
    fetchMoviesMock.mockImplementation(() =>
      Promise.resolve([
        {
          userId: 40,
          like: 56,
          dislike: 66,
          url: 'https://www.youtube.com/watch?v=4LPDJWZiBgc',
          createdAt: new Date(),
          title: 'title test',
          description: '------------------------------\n\nĐừng ',
          userName: 'phuythanh@gmail.com',
          youtubeId: '4LPDJWZiBgc',
          id: 1,
        },
      ])
    );
    const history = createMemoryHistory();
    const route = '/share';
    history.push(route);
    window.history.pushState({}, 'Test page', route);
    const { getByText, debug } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    await waitFor(() => expect(getByText(/You are not allowed to view this page/i)).toBeInTheDocument());
  });
});

describe('User logged in', () => {
  it('Should show user/pass inputs inputs after logged in successfully', async () => {
    const fetchMoviesMock = jest.spyOn(moveClient, 'fetchMovies');
    fetchMoviesMock.mockImplementation(() =>
      Promise.resolve([
        {
          userId: 40,
          like: 56,
          dislike: 66,
          url: 'https://www.youtube.com/watch?v=4LPDJWZiBgc',
          createdAt: new Date(),
          title: 'title test',
          description: '------------------------------\n\nĐừng ',
          userName: 'phuythanh@gmail.com',
          youtubeId: '4LPDJWZiBgc',
          id: 1,
        },
      ])
    );
    const history = createMemoryHistory();
    const { getByText, getByPlaceholderText, debug } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    const user: UserResponse = {
      email: 'test@gmail.com',
      id: 1,
      password: 'e10adc3949ba59abbe56e057f20f883e',
    };
    const getUserByEmailMock = jest.spyOn(userClient, 'getUserByEmail');

    getUserByEmailMock.mockImplementation(() => Promise.resolve([user]));
    const emailE = getByPlaceholderText('email');
    fireEvent.change(emailE, { target: { value: 'test@gmail.com' } });
    const passwordE = getByPlaceholderText('password');
    fireEvent.change(passwordE, { target: { value: '123456' } });
    const registerButton = getByText('Login / Register');

    fireEvent(
      registerButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    await waitFor(() => expect(screen.getByText(/Welcome/i)).toBeInTheDocument());
  });

  it('Should Share page', async () => {
    const history = createMemoryHistory();
    const { getByText, getByPlaceholderText, debug } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    const user: UserResponse = {
      email: 'test@gmail.com',
      id: 1,
      password: 'e10adc3949ba59abbe56e057f20f883e',
    };
    const getUserByEmailMock = jest.spyOn(userClient, 'getUserByEmail');

    getUserByEmailMock.mockImplementation(() => Promise.resolve([user]));
    const emailE = getByPlaceholderText('email');
    fireEvent.change(emailE, { target: { value: 'test@gmail.com' } });
    const passwordE = getByPlaceholderText('password');
    fireEvent.change(passwordE, { target: { value: '123456' } });
    const registerButton = getByText('Login / Register');

    fireEvent(
      registerButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    await waitFor(() => expect(screen.getByText(/Welcome/i)).toBeInTheDocument());
    history.push('/share');
    await waitFor(() => expect(screen.getByText(/Share a YouTube movie/i)).toBeInTheDocument());
  });
});
