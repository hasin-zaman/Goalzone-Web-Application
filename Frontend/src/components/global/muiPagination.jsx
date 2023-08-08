import * as React from 'react';
import Pagination from '@mui/material/Pagination';

export default function MUIPagination({ count, changePage }) {
  return (
    <Pagination count={count} shape="rounded" color="primary" siblingCount={1} onChange={changePage} 
    sx={{
      '& .MuiPaginationItem-page': {
        color: 'white',
      },
      '& .MuiPaginationItem-icon': {
        color: 'white',
      },
    }}
    />
  );
}