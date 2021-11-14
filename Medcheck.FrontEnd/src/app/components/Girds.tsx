import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from '@mui/material';
import { useState } from 'hoist-non-react-statics/node_modules/@types/react';
import React from 'react';
interface IProps {
  data: any;
  columns: any;
}
export const Girds = ({ data, columns }: IProps) => {
  // const [page, setPage] = React.useState(0);
  return (
    //     <TableContainer component={Paper}>
    //       <Table aria-label="custom pagination table">
    //       <TableHead>
    //         <TableRow>
    //           <TableCell>Dessert (100g serving)</TableCell>
    //           <TableCell align="right">Calories</TableCell>
    //           <TableCell align="right">Fat&nbsp;(g)</TableCell>
    //           <TableCell align="right">Carbs&nbsp;(g)</TableCell>
    //           <TableCell align="right">Protein&nbsp;(g)</TableCell>
    //         </TableRow>
    //       </TableHead>
    //         <TableBody>
    //           {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) => (
    //             <TableRow key={row.name}>
    //               <TableCell component="th" scope="row">
    //                 {row.name}
    //               </TableCell>
    //               <TableCell style={{ width: 160 }} align="right">
    //                 {row.calories}
    //               </TableCell>
    //               <TableCell style={{ width: 160 }} align="right">
    //                 {row.fat}
    //               </TableCell>
    //             </TableRow>
    //           ))}

    //           {emptyRows > 0 && (
    //             <TableRow style={{ height: 53 * emptyRows }}>
    //               <TableCell colSpan={6} />
    //             </TableRow>
    //           )}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    <></>
  );
};
