import { BaseEntity } from '../types/entity';

export const insertItem = <T extends BaseEntity>(record: Partial<T>, data: T[]) => {
  const newData = [...data];
  newData.push(record as T);

  return newData;
};

export const updateItem = <T extends BaseEntity>(record: Partial<T>, data: T[]) => {
  const newData = [...data];
  const index = newData.findIndex((item) => item.id === record.id);

  if (index > -1) {
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...record,
    });
  } else {
    newData.push(record as T);
  }

  return newData;
};

export const deleteItem = <T extends BaseEntity>(id: number, data: T[]) => {
  const newData = [...data];
  const idx = data.findIndex((item) => item.id === id);
  if (idx >= 0) {
    newData.splice(idx, 1);
  }
  return newData;
};
