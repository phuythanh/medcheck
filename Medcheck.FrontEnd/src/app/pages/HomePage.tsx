import { List } from '../components/List/List';
import { useFetch } from 'app/hooks/useFetch';
import { ExpenseResponse } from 'app/types/expense';
import { fetchExpenses, filterExpenses } from 'app/apis/expenseClient';
import { CircularProgress, Typography } from '@mui/material';
import { RadialChart } from 'react-vis';
import _ from 'lodash';
import { useEffect, useState } from 'react';
interface IChart {
  angle?: number | undefined;
  className?: string | undefined;
  label?: string | undefined;
  radius?: number | undefined;
  subLabel?: string | undefined;
}
export const HomePage = () => {
  const { loading, data } = useFetch<ExpenseResponse[]>(filterExpenses);
  const [myData, setMyData] = useState<IChart[]>([]);
  useEffect(() => {
    if (data) {
      const result = _(data)
        .groupBy((x: ExpenseResponse) => x.categoryId)
        .map((vals: ExpenseResponse[]): IChart => {
          const [item] = vals;
          const total = _.sumBy(vals, (x: ExpenseResponse) => x.value);
          const value: IChart = {
            label: item.category.title,
            angle: total,
            subLabel: total?.toString(),
          };
          return value;
        })
        .value();
      setMyData(result);
    } else {
      setMyData([]);
    }
  }, [data]);
  return (
    <div>
      <Typography variant="h5" component="div">
        Last 30 days report
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <RadialChart data={myData} width={300} height={300} showLabels />
        </>
      )}
    </div>
  );
};
