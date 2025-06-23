import React, { useState } from 'react';

const BookSearchFilter = ({ onFilter }) => {
  const [search, setSearch] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ search, author, category, status });
  };

  return (
    <form className="row g-2 mb-4" onSubmit={handleSubmit}>
      <div className="col-md-3">
        <input type="text" className="form-control" placeholder="Recherche titre..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="col-md-3">
        <input type="text" className="form-control" placeholder="Auteur" value={author} onChange={e => setAuthor(e.target.value)} />
      </div>
      <div className="col-md-3">
        <input type="text" className="form-control" placeholder="Catégorie" value={category} onChange={e => setCategory(e.target.value)} />
      </div>
      <div className="col-md-2">
        <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">État</option>
          <option value="à lire">À lire</option>
          <option value="en cours de lecture">En cours de lecture</option>
          <option value="terminé">Terminé</option>
        </select>
      </div>
      <div className="col-md-1">
        <button type="submit" className="btn btn-primary w-100">Filtrer</button>
      </div>
    </form>
  );
};

export default BookSearchFilter;
