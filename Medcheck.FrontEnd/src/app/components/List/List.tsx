import React from 'react';
interface IProps<T = {}> {
  items: T[];
  className?: string;
  renderItem: (item: T) => React.ReactNode;
}
export const List = ({ items, renderItem, className = '' }: IProps) => {
  return (
    <div className={className}>
      {items.map((m, index) => (
        <React.Fragment key={index}> {renderItem(m)} </React.Fragment>
      ))}
    </div>
  );
};
