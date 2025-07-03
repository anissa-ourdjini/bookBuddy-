import React from 'react';
import AddBookForm from '../components/AddBookForm';

const AddBook = () => (
  <div className="container mt-5 text-center">
    <h2>Add a Book</h2>
    <div className="row justify-content-center">
      <div className="col-md-8">
        <AddBookForm />
      </div>
    </div>
  </div>
);

export default AddBook; 