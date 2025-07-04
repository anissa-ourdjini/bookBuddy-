import React from 'react';

const BookCard = ({ book, onImageClick, footer, style = {} }) => {
  const {
    coverImage = '',
    title = 'No title',
    author = 'Unknown',
    category = 'Unknown',
    pages = 'N/A',
    status = 'N/A',
  } = book || {};

  const defaultStyle = {
    border: '2px solid #ff2e2e',
    background: '#181818',
    boxShadow: '0 0 30px 2px #ff2e2e33, 0 0 10px #000a',
    borderRadius: 8,
  };

  return (
    <div className="card d-flex flex-column justify-content-between" style={{ ...defaultStyle, ...style }}>
      <div style={{ cursor: onImageClick ? 'pointer' : 'default' }} onClick={onImageClick}>
        {coverImage ? (
          <img
            src={coverImage}
            className="card-img-top"
            alt={title}
            style={{ height: 200, width: '100%', objectFit: 'contain', background: '#222', borderRadius: 8 }}
          />
        ) : (
          <div style={{ height: 200, width: '100%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff2e2e', fontSize: 24, borderRadius: 8 }}>
            No image
          </div>
        )}
        <div className="card-body">
          <h5 className="card-title" style={{ color: '#ff2e2e', fontFamily: 'Special Elite, Creepster, serif' }}>{title}</h5>
          <p className="card-text">Auteur : {author}</p>
          <p className="card-text">Catégorie : {category}</p>
          <p className="card-text">Pages : {pages}</p>
          <p className="card-text">Statut : {status}</p>
        </div>
      </div>
      <div className="card-footer bg-transparent border-0 d-flex justify-content-center gap-2 mt-auto flex-wrap">
        {footer}
      </div>
    </div>
  );
};

export default BookCard; 