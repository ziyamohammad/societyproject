import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
   <BrowserRouter>
  <Routes>
    <Route path="/" element={< Login/>} />
    <Route path="/signup" element={<SignUp />} />
  </Routes>
</BrowserRouter>
    </>
  );
}

export default App;
