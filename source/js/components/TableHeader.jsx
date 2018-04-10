import React from 'react';

const TableHeader = ({ columns, sortable, handleChangeSortMethod, parent }) => {
  return (
    <thead className='TableHeader'>
      <tr className='TableRow'>
        { columns && 
          columns.map(column => {
            return (
              <th className='TableCell' key={ parent + column.key }>
                <div className={`Title ${ column.key }`}>
                  <div className='Label'>
                    {column.name}
                  </div>
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
                </div>
              </th>
            );
          })
        }
      </tr>
    </thead>
  );
};

export default TableHeader;
