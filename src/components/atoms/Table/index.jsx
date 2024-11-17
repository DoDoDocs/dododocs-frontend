import styled from 'styled-components';
import React, { useMemo } from 'react';

export const TableContainer = styled.div`
  background: #1a1b1e;
  overflow: hidden;
  /* border: 1px solid #2a2b2e; */
`;

export const StyledTable = styled.table`
 width: 100%;
  border-collapse: collapse;
  background: #1a1b1e;

  th {
    background: #232428;
    color: #a8a9b3;
    padding: 1rem;
    font-weight: 500;
    text-align: left;
    border-bottom: 1px solid #2a2b2e;

    &:first-child {
      width: 48px;
      text-align: center;

    }
  }

  td {
    padding: 1rem;
    color: #e4e5e7;
    border-bottom: 1px solid #2a2b2e;

    &:first-child {
      text-align: center;
    }
  }

  tr:hover td {
    background: #252629;
  }

  tr.selected td {
    background: #2a2d3d7d;
    
    &:first-child {

      position : relative;
      &::before {
  content: '';
  position: absolute;
  display: inline-block;
  width: 0.135rem;
  top : 0;
  bottom: 0;
  left : 0;
  height: 100%;
  background-color : #8b5cf6;
  /* border: 2px solid #8b5cf6; */
  /* border-radius: 50%; */
  box-sizing: border-box;
}    }

  }

  .tag {
    background: #2a2d3d;
    color: #8b5cf6;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.875rem;
    display: inline-block;
  }


`;


const RadioCell = styled.input`
width: 18px;
height: 18px;
cursor: pointer;
accent-color: #8b5cf6;
`;

const Table = ({
  dataSource = [],
  columns = [
    { key: 'Repository', title: 'Repository' },
    { key: 'Branch', title: 'Branch' },
    { key: 'Status', title: 'Status' },
    { key: 'action', title: ' ' },
  ],

  onRowClick,
  selectedRow, // 선택된 단일 행의 key
  onSelectionChange, // 선택 변경 핸들러
  tagKeysArr = ['tag']
}) => {
  // 체크박스 컬럼 추가
  const allColumns = useMemo(() => [
    { key: 'checkbox', title: '' }, // 헤더에 체크박스 없음
    ...columns
  ], [columns]);

  const renderColumns = useMemo(() => (
    <tr>
      {allColumns.map(column => (
        <th key={column.key}>{column.title}</th>
      ))}
    </tr>
  ), [allColumns]);




  return (
    <TableContainer>
      <StyledTable>
        <thead>{renderColumns}</thead>
        <tbody>
          {dataSource.map((row, index) => (
            <tr
              key={row.key || index}
              onClick={() => onRowClick?.(row, index)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
              className={selectedRow === row.key ? 'selected' : ''}
            >
              <td onClick={e => e.stopPropagation()}>
                <RadioCell
                  type="radio"
                  name="tableRow"
                  checked={selectedRow === row.key}
                  onChange={() => onSelectionChange(row.key)}
                />
              </td>
              {
                columns.map(column => (
                  <td key={column.key}>
                    {column.render ?
                      column.render(row[column.key], row) :
                      row[column.key]}
                  </td>
                ))
              }
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default React.memo(Table);
