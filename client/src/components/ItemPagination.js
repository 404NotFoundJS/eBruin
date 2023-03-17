import Pagination from 'react-bootstrap/Pagination';

function itemPagination({ page, pages, keyword = '' }) {
  const constructUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterKeyword = filter.Keyword || keyword;
    if (filterKeyword) {
      return `/search/keyword/${filterKeyword}/pageNumber/${filterPage}`;
    }
    return `/pageNumber/${filterPage}`;
  };

  return (
    <Pagination>
      <Pagination.First href={constructUrl({ page: 1 })} />
      {page !== 1 && (
        <Pagination.Prev href={constructUrl({ page: page - 1 })}>
          {page - 1}
        </Pagination.Prev>
      )}

      {page !== 1 && (
        <Pagination.Item href={constructUrl({ page: page - 1 })}>
          {page - 1}
        </Pagination.Item>
      )}
      <Pagination.Item disabled>{page}</Pagination.Item>
      {page !== pages && (
        <Pagination.Item href={constructUrl({ page: page + 1 })}>
          {page + 1}
        </Pagination.Item>
      )}

      {page !== pages && (
        <Pagination.Next href={constructUrl({ page: page + 1 })}>
          {page + 1}
        </Pagination.Next>
      )}
      <Pagination.Last href={constructUrl({ page: pages })} />
    </Pagination>
  );
}

export default itemPagination;
