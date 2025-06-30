import React from 'react';

const FavoriteButton = ({ isFavorite, onAdd, onRemove }) => {
  return isFavorite ? (
    <button className="btn btn-warning btn-sm" onClick={onRemove} title="Remove from favorites">
      ★ Favorite
    </button>
  ) : (
    <button className="btn btn-outline-warning btn-sm" onClick={onAdd} title="Add to favorites">
      ☆ Add to favorites
    </button>
  );
};

export default FavoriteButton;
