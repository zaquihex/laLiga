import React, { useState } from 'react';
import { instanceOf, func } from 'prop-types';

import styled from 'styled-components';

import 'styles/Table.scss';
import { Button } from './common/Button';

const SpanPage = styled.span`
    font-weight: bold;
  `;

const SpanTotalPages = styled.span`
  `;

const Table = ({ listColumns, data, paginationInfo, updateData, onRowSelected }) => {
  const [page, setPage] = useState(paginationInfo.page);
  return (
    <>
      <table className="table">
        <tbody>
          <tr>
            {listColumns.map((column) => <th style={{ width: column.width || '' }} key={`column-head-${column.id}`}>{ column.text }</th>)}
          </tr>
          { data.map((element) => (
            <tr key={`row-${element.id}`} onClick={() => { onRowSelected(element); }}>
              {listColumns.map((column) => (<td key={`cell-${element.id}-${column.id}`}>{column.renderer ? column.renderer(element[column.id]) : element[column.id]}</td>))}
            </tr>
          )) }
        </tbody>
      </table>
      {paginationInfo
        && (
          <div className="centerElements">
            <Button onClick={() => {
              if (page !== 1) {
                setPage(1);
                updateData(1);
              }
            }}
            >
              First
            </Button>
            <Button onClick={() => {
              const newPage = page - 1;
              if (newPage > 0) {
                setPage(newPage);
                updateData(newPage);
              }
            }}
            >
              Previous
            </Button>
            <SpanPage>{page}</SpanPage>
            <SpanTotalPages> / {paginationInfo.totalPages}</SpanTotalPages>
            <Button onClick={() => {
              const newPage = page + 1;
              if (newPage <= paginationInfo.totalPages) {
                setPage(newPage);
                updateData(newPage);
              }
            }}
            >
              Next
            </Button>
            <Button onClick={() => {
              if (page !== paginationInfo.totalPages) {
                setPage(paginationInfo.totalPages);
                updateData(paginationInfo.totalPages);
              }
            }}
            >
              Last
            </Button>
          </div>
        )}
    </>
  );
};

Table.defaultProps = {
  paginationInfo: null,
  updateData: () => {},
  onRowSelected: () => {},
};

Table.propTypes = {
  listColumns: instanceOf(Array).isRequired,
  data: instanceOf(Array).isRequired,
  paginationInfo: instanceOf(Object),
  updateData: func,
  onRowSelected: func,
};

export default Table;
