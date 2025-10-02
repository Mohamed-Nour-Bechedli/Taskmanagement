import './App.css';
import { Route, Routes, Navigate} from 'react-router-dom'
import Hero from './components/Hero';
import Login from './components/Login'
import Signup from './components/Signup';

function App() {

  const user = localStorage.getItem('token');

  return (
    <Routes>
      <Route path='/' element={user ? <Hero /> : <Navigate to='/login' />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<Navigate  replace to='/login' />} />
    </Routes>
  );
}

export default App;
