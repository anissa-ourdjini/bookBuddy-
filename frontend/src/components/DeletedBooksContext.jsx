import React, { createContext, useContext, useState, useEffect } from 'react';

const DeletedBooksContext = createContext();

export const useDeletedBooks = () => useContext(DeletedBooksContext);

export const DeletedBooksProvider = ({ children }) => {
  const [deletedBooks, setDeletedBooks] = useState(() => {
    const saved = localStorage.getItem('deletedBooks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('deletedBooks', JSON.stringify(deletedBooks));
  }, [deletedBooks]);

  const addDeletedBook = (book) => {
    setDeletedBooks((prev) => [...prev, book]);
  };

  const restoreDeletedBook = (bookId) => {
    setDeletedBooks((prev) => prev.filter((b) => b._id !== bookId));
  };

  const removeDeletedBook = (bookId) => {
    setDeletedBooks((prev) => prev.filter((b) => b._id !== bookId));
  };

  return (
    <DeletedBooksContext.Provider value={{ deletedBooks, addDeletedBook, restoreDeletedBook, removeDeletedBook }}>
      {children}
    </DeletedBooksContext.Provider>
  );
}; 