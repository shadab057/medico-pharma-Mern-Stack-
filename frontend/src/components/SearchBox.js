import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';

export default function SearchBox({ style }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  const inputStyles = {
    borderRadius: '48px', // Adjust border-radius as needed
  };

  const buttonStyles = {
    borderRadius: '48px', // Adjust border-radius as needed
    marginLeft: '-1px', // Adjust margin as needed to align with the input
    color: '#000000',
  };

  return (
    <Form style={{ marginRight: '20px', ...style }} className="d-flex me-auto" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search medicine..."
          aria-label="Search Products"
          aria-describedby="button-search"
          style={{ ...inputStyles }}
        />
        <Button
          variant="outline-primary"
          type="submit"
          id="button-search"
          style={{ ...buttonStyles }}
        >
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
