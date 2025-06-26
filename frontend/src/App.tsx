import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookCollection from './pages/BookCollection';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import AudioIntro from './components/AudioIntro';
import './App.css';
import './horror-theme.css';

function App() {
  return (
    <Router>
      <AudioIntro />
      <Navbar />
      <div className="container-fluid p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<BookCollection />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
