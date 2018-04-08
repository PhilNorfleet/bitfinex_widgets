import React from 'react';

const TableHeader = ({ columns, sortable, handleChangeSortMethod, parent }) => {
  return (
    <thead className='TableHeader'>
      <tr className='TableRow'>
        { columns && 
          columns.map(column => {
            return (
              <th className={`TableHeaderItem ${column.key}`} key={ parent + column.key }>
                {column.name}
                {sortable &&
                  <div className='SortArrows'>
                    <div
                      className='UpArrow'
                      onClick={ () => handleChangeSortMethod(column.key, 'asc') }
                    />
                    <div
                      className='DownArrow'
                      onClick={ () => handleChangeSortMethod(column.key, 'desc') }
                    />
                  </div>
                }
              </th>
            );
          })
        }
      </tr>
    </thead>
  );
};

export default TableHeader;
