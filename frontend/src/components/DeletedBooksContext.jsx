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

  const removeDeletedBook = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/books/${bookId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeletedBooks((prev) => prev.filter((b) => b._id !== bookId));
    } catch (err) {
      alert('Erreur lors de la suppression définitive du livre.');
    }
  };

  return (
    <DeletedBooksContext.Provider value={{ deletedBooks, addDeletedBook, restoreDeletedBook, removeDeletedBook }}>
      {children}
    </DeletedBooksContext.Provider>
  );
}; 