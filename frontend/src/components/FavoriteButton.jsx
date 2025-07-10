import React from 'react';

const FavoriteButton = ({ isFavorite, onAdd, onRemove }) => {
  return isFavorite ? (
    <button className="btn btn-warning btn-sm" onClick={onRemove} title="Remove from favorites">
      <span style={{ color: 'gold', fontSize: '1.3em' }}>★</span> Favorite
    </button>
  ) : (
    <button className="btn btn-outline-warning btn-sm" onClick={onAdd} title="Add to favorites">
      <span style={{ color: '#ccc', fontSize: '1.3em' }}>☆</span> Add to favorites
    </button>
  );
};

export default FavoriteButton;
