import React from 'react';
import BookCard from '../components/BookCard';
import ConfirmModal from '../components/ConfirmModal';
import { useDeletedBooks } from '../components/DeletedBooksContext';

const placeholderStyle = {
  height: 180,
  width: '100%',
  background: 'linear-gradient(135deg, #222 60%, #ff2e2e33 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ff2e2e',
  fontSize: 32,
  borderRadius: 12,
  marginBottom: 10,
  fontFamily: 'Special Elite, Creepster, serif',
  letterSpacing: 1,
};

const DeletedBooks = () => {
  const { deletedBooks, restoreDeletedBook, removeDeletedBook } = useDeletedBooks();
  const [confirm, setConfirm] = React.useState({ show: false, bookId: null });

  const handleRestore = (bookId) => {
    restoreDeletedBook(bookId);
  };

  const handleRemove = (bookId) => {
    setConfirm({ show: true, bookId });
  };

  const handleConfirmRemove = () => {
    removeDeletedBook(confirm.bookId);
    setConfirm({ show: false, bookId: null });
  };

  const handleCloseModal = () => {
    setConfirm({ show: false, bookId: null });
  };

  return (
    <div className="container mt-5">
      <h2 style={{ color: '#ff2e2e', textAlign: 'center', marginBottom: 40, textShadow: '0 0 10px #ff2e2e55' }}>Deleted Books</h2>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {deletedBooks.length === 1 ? (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div style={{ minWidth: 250, maxWidth: 400, width: '100%' }}>
              <BookCard
                book={deletedBooks[0]}
                onImageClick={null}
                footer={
                  <>
                    <button
                      className="btn btn-success btn-sm"
                      style={{ fontWeight: 'bold', fontFamily: 'Special Elite, Creepster, serif', letterSpacing: 1 }}
                      onClick={() => handleRestore(deletedBooks[0]._id)}
                    >
                      Restore
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      style={{ fontWeight: 'bold', fontFamily: 'Special Elite, Creepster, serif', letterSpacing: 1 }}
                      onClick={() => handleRemove(deletedBooks[0]._id)}
                    >
                      Remove
                    </button>
                  </>
                }
                style={{}}
              />
            </div>
          </div>
        ) : (
          <div className="row d-flex justify-content-center g-4">
            {deletedBooks.length === 0 && <div className="text-center" style={{ color: '#fff' }}>No deleted books.</div>}
            {deletedBooks.map((book) => (
              <div className="col-12 col-sm-6 col-md-4 mb-4 mx-auto px-2" key={book._id}>
                <BookCard
                  book={book}
                  onImageClick={null}
                  footer={
                    <>
                      <button
                        className="btn btn-success btn-sm"
                        style={{ fontWeight: 'bold', fontFamily: 'Special Elite, Creepster, serif', letterSpacing: 1 }}
                        onClick={() => handleRestore(book._id)}
                      >
                        Restore
                      </button>
                      <button
                        className="btn btn-success btn-sm"
                        style={{ fontWeight: 'bold', fontFamily: 'Special Elite, Creepster, serif', letterSpacing: 1 }}
                        onClick={() => handleRemove(book._id)}
                      >
                        Remove
                      </button>
                    </>
                  }
                  style={{}}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <ConfirmModal
        show={confirm.show}
        onClose={handleCloseModal}
        onConfirm={handleConfirmRemove}
        message={"Are you sure you want to remove this book from the trash?"}
      />
    </div>
  );
};

export default DeletedBooks; 