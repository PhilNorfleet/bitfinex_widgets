import React from 'react';
import styled from 'styled-components';

const Header = styled.thead``;
const Row = styled.tr``;
const Cell = styled.th`
  display: table-cell;
`;
const Title = styled.div`
  display: flex;
`;
const Label = styled.div`
  flex: 1 1;
`;
const SortArrows = styled.div`
  float: 0 1;
`;
const UpArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid var(--textColor);
  position: relative;
  top: -1px;
`;

const DownArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid var(--textColor);
  position: relative;
  bottom: -1px;
`;

const TableHeader = ({ columns, sortable, sortMethod, handleChangeSortMethod, parent }) => {
  return (
    <Header>
      <Row>
        { columns && 
          columns.map(column => {
            return (
              <Cell key={ parent + column.key }>
                <Title className={ column.key }>
                  <Label>
                    {column.name}
                  </Label>
                  {sortable &&
                    <SortArrows>
                      <UpArrow
                        className={ sortMethod === column.key && 'highlighted' }
                        onClick={ () => handleChangeSortMethod(column.key, 'asc') }
                      />
                      <DownArrow
                        className={sortMethod === column.key && ' highlighted'}
                        onClick={ () => handleChangeSortMethod(column.key, 'desc') }
                      />
                  </SortArrows>
                  }
                </Title>
              </Cell>
            );
          })
        }
      </Row>
    </Header>
  );
};

export default TableHeader;
