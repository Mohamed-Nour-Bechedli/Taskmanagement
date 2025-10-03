import { Route, Routes, Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          localStorage.getItem('token') ? <Hero /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/profile"
        element={
          localStorage.getItem('token') ? <Profile /> : <Navigate to="/login" />
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
