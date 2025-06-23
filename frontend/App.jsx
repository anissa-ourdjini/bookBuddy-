import React from 'react';
import AddBookForm from './AddBookForm';

function App() {
  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: 20, border: '1px solid #eee', borderRadius: 8 }}>
      <h2>Ajouter un livre</h2>
      <AddBookForm />
    </div>
  );
}

export default App;
