import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

export default function SearchBar() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const searchHandler = (e) => {
    e.preventDefault();
    const encodedKeyword = encodeURIComponent(keyword);
    navigate(`/search/keyword/${encodedKeyword}/pageNumber/1`);
  };
  return (
    <Form className="ms-auto d-flex search" onSubmit={searchHandler}>
      <Form.Control
        type="search"
        placeholder="Search Listings"
        className="me-2"
        aria-label="Search"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button
        className="warning"
        variant="outline-warning"
        onClick={searchHandler}
      >
        Search
      </Button>
    </Form>
  );
}
