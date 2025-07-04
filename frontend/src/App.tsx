import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookCollection from './pages/BookCollection';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import Rewards from './pages/Rewards';
import AddBook from './pages/AddBook';
import DeletedBooks from './pages/DeletedBooks';
import Navbar from './components/Navbar';
import './App.css';
import { DeletedBooksProvider } from './components/DeletedBooksContext';

function App() {
  return (
    <DeletedBooksProvider>
      <Router>
        <Navbar />
        <div className="container-fluid p-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/books" element={<BookCollection />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/deleted-books" element={<DeletedBooks />} />
          </Routes>
        </div>
      </Router>
    </DeletedBooksProvider>
  );
}

export default App;
