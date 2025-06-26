import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import FavoriteBooks from './components/FavoriteBooks';
import Profile from './components/Profile';
import Rewards from './components/Rewards';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <div className="main-container py-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute element={<BookList />} />} />
          <Route path="/add" element={<PrivateRoute element={<AddBookForm />} />} />
          <Route path="/favorites" element={<PrivateRoute element={<FavoriteBooks />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/rewards" element={<PrivateRoute element={<Rewards />} />} />
        </Routes>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
