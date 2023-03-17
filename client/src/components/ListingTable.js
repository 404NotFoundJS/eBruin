import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';

export default function ListingTable({
  listings,
  noMatch,
  pageNumber,
  setPageNumber,
  totalPages,
}) {
  return noMatch ? (
    <div>No listings found</div>
  ) : (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Posting Date</th>
            <th>Quantity Left</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing._id}>
              <td>{listing.name}</td>
              <td>${listing.price}</td>
              <td>{listing.createdAt.substring(0, 10)}</td>
              <td>{listing.countInStock}</td>
              <td>{listing.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-3">
          <Pagination.First
            disabled={pageNumber === 1}
            onClick={() => setPageNumber(1)}
          />
          <Pagination.Prev
            disabled={pageNumber === 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          />
          <Pagination.Item disabled>{pageNumber}</Pagination.Item>
          <Pagination.Next
            disabled={pageNumber === totalPages}
            onClick={() => setPageNumber(pageNumber + 1)}
          />
          <Pagination.Last
            disabled={pageNumber === totalPages}
            onClick={() => setPageNumber(totalPages)}
          />
        </Pagination>
      )}
    </div>
  );
}
