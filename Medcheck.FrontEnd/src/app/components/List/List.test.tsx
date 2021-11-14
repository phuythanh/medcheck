import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { List } from './List';
import { ExpenseResponse } from 'app/types/movie';
import { Card } from '../Card/Card';

describe('Display List', () => {
  it('Should show list', () => {
    const movie: ExpenseResponse[] = [
      {
        userId: 40,
        like: 56,
        dislike: 66,
        url: 'https://www.youtube.com/watch?v=4LPDJWZiBgc',
        createdAt: new Date(),
        title: 'title test',
        description: 'description test',
        userName: 'phuythanh@gmail.com',
        youtubeId: '4LPDJWZiBgc',
        id: 1,
      },
      {
        userId: 40,
        like: 56,
        dislike: 66,
        url: 'https://www.youtube.com/watch?v=4LPDJWZiBgc',
        createdAt: new Date(),
        title: 'title test1',
        description: 'description test',
        userName: 'phuythanh@gmail.com',
        youtubeId: '4LPDJWZiBgc',
        id: 2,
      },
    ];
    const { getByText, getByTestId } = render(
      <List
        items={movie}
        renderItem={(movie: ExpenseResponse) => (
          <div data-testid={movie.id}>
            <div>{movie.title}</div>
          </div>
        )}
      />
    );

    expect(getByTestId('1')).toBeInTheDocument();
    expect(getByText('title test')).toBeInTheDocument();
    expect(getByTestId('2')).toBeInTheDocument();
    expect(getByText('title test1')).toBeInTheDocument();
  });
});
