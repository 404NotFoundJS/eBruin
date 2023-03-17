import React from 'react';
import Pagination from '@mui/material/Pagination';

export default function BasicPagination({ totalPages, setPageNum }) {
  const hanldePageChange = (event, page) => {
    setPageNum(page);
  };
  return (
    <div>
      <Pagination
        count={totalPages}
        color="primary"
        onChange={hanldePageChange}
      />
    </div>
  );
}
