import React from 'react';

const FavoriteButton = ({ isFavorite, onAdd, onRemove }) => {
  return isFavorite ? (
    <button className="btn btn-warning btn-sm" onClick={onRemove} title="Retirer des favoris">
      ★ Favori
    </button>
  ) : (
    <button className="btn btn-outline-warning btn-sm" onClick={onAdd} title="Ajouter aux favoris">
      ☆ Favori
    </button>
  );
};

export default FavoriteButton;
