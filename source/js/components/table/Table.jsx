import React from 'react';
import styled from 'styled-components';
import TableHeaderContainer from 'containers/table/TableHeader';

const TableOuter = styled.table`
  width: 100%;
`;
const TableBody = styled.tbody``;
const Table = ({ columns, makeRows, data, sortable }) => {
  return (
    <TableOuter>
      <TableHeaderContainer columns={ columns } sortable={ sortable } />
      <TableBody>
        { makeRows(data) }
      </TableBody >
    </TableOuter>
  );
}
export default Table;