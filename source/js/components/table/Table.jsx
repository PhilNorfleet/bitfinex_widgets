import React from 'react';
import styled from 'styled-components';
import TableHeaderContainer from 'containers/table/TableHeader';

const TableOuter = styled.table`
  width: 100%;
`;
const TableBody = styled.tbody``;
const Table = ({ columns, rows, sortable, compound }) => {
  return (
    <TableOuter>
      <TableHeaderContainer columns={ columns } sortable={ sortable } />
      { !compound  && 
        <TableBody>
          { rows }
        </TableBody >
      }
      { compound &&
        rows
      }
    </TableOuter>
  );
}
export default Table;