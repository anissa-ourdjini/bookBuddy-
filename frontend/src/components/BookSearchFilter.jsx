import React, { useState, useEffect } from 'react';

const BookSearchFilter = ({ onFilter }) => {
  const [search, setSearch] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [authorSuggestions, setAuthorSuggestions] = useState([]);
  const [showAuthorSuggestions, setShowAuthorSuggestions] = useState(false);
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ search, author, category, status });
    setShowSuggestions(false);
    setShowAuthorSuggestions(false);
    setShowCategorySuggestions(false);
  };

  const handleReset = () => {
    setSearch('');
    setAuthor('');
    setCategory('');
    setStatus('');
    setSuggestions([]);
    setAuthorSuggestions([]);
    setCategorySuggestions([]);
    setShowSuggestions(false);
    setShowAuthorSuggestions(false);
    setShowCategorySuggestions(false);
    onFilter({});
  };

  const fetchTitles = async () => {
    console.log('fetchTitles called');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/books/titles', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const titles = await res.json();
        setSuggestions(titles);
        console.log('TITLES:', titles);
      }
    } catch (e) {
      console.error('fetchTitles error', e);
    }
  };

  const fetchAuthors = async () => {
    console.log('fetchAuthors called');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/books/authors', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const authors = await res.json();
        setAuthorSuggestions(authors);
        console.log('AUTHORS:', authors);
      }
    } catch (e) {
      console.error('fetchAuthors error', e);
    }
  };

  const fetchCategories = async () => {
    console.log('fetchCategories called');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/books/categories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const categories = await res.json();
        setCategorySuggestions(categories);
        console.log('CATEGORIES:', categories);
      }
    } catch (e) {
      console.error('fetchCategories error', e);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setShowSuggestions(true);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
    setShowAuthorSuggestions(true);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setShowCategorySuggestions(true);
  };

  const handleSuggestionClick = (title) => {
    setSearch(title);
    setShowSuggestions(false);
  };

  const handleAuthorSuggestionClick = (author) => {
    setAuthor(author);
    setShowAuthorSuggestions(false);
  };

  const handleCategorySuggestionClick = (category) => {
    setCategory(category);
    setShowCategorySuggestions(false);
  };

  const filteredSuggestions = suggestions.filter(title =>
    title.toLowerCase().includes(search.toLowerCase()) && search.trim() !== ''
  );
  const filteredAuthorSuggestions = authorSuggestions.filter(a =>
    a.toLowerCase().includes(author.toLowerCase()) && author.trim() !== ''
  );
  const filteredCategorySuggestions = categorySuggestions.filter(c =>
    c.toLowerCase().includes(category.toLowerCase()) && category.trim() !== ''
  );

  useEffect(() => {
    console.log('BookSearchFilter mounted or updated');
  }, []);

  return (
    <form className="row g-2 mb-4" onSubmit={handleSubmit} autoComplete="off">
      <div className="col-md-3 position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="Search title..."
          value={search}
          onChange={handleSearchChange}
          onFocus={fetchTitles}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="list-group position-absolute w-100" style={{ zIndex: 10, maxHeight: 200, overflowY: 'auto' }}>
            {filteredSuggestions.map((title, idx) => (
              <li
                key={idx}
                className="list-group-item list-group-item-action"
                style={{ cursor: 'pointer', background: '#222', color: '#ff2e2e' }}
                onMouseDown={() => handleSuggestionClick(title)}
              >
                {title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-md-3 position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="Author"
          value={author}
          onChange={handleAuthorChange}
          onFocus={fetchAuthors}
          onBlur={() => setTimeout(() => setShowAuthorSuggestions(false), 150)}
        />
        {showAuthorSuggestions && filteredAuthorSuggestions.length > 0 && (
          <ul className="list-group position-absolute w-100" style={{ zIndex: 10, maxHeight: 200, overflowY: 'auto' }}>
            {filteredAuthorSuggestions.map((a, idx) => (
              <li
                key={idx}
                className="list-group-item list-group-item-action"
                style={{ cursor: 'pointer', background: '#222', color: '#ff2e2e' }}
                onMouseDown={() => handleAuthorSuggestionClick(a)}
              >
                {a}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-md-3 position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="Category"
          value={category}
          onChange={handleCategoryChange}
          onFocus={fetchCategories}
          onBlur={() => setTimeout(() => setShowCategorySuggestions(false), 150)}
        />
        {showCategorySuggestions && filteredCategorySuggestions.length > 0 && (
          <ul className="list-group position-absolute w-100" style={{ zIndex: 10, maxHeight: 200, overflowY: 'auto' }}>
            {filteredCategorySuggestions.map((c, idx) => (
              <li
                key={idx}
                className="list-group-item list-group-item-action"
                style={{ cursor: 'pointer', background: '#222', color: '#ff2e2e' }}
                onMouseDown={() => handleCategorySuggestionClick(c)}
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-md-2">
        <select
          className="form-control"
          value={status}
          onChange={e => {
            setStatus(e.target.value);
            console.log('Status onChange:', e.target.value);
          }}
        >
          <option value="">Status</option>
          <option value="to read">To read</option>
          <option value="reading">Reading</option>
          <option value="finished">Finished</option>
        </select>
      </div>
      <div className="col-md-1">
        <button type="submit" className="btn btn-primary w-100">Filter</button>
        <button type="button" className="btn btn-secondary w-100 mt-2" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
};

export default BookSearchFilter;
