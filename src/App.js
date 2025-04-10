import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Main from './components/Main';
import Card from './components/Card';
import Interface from './components/Interface';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Router>
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/card" element={<Card />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/main" element={<Main />} />
        <Route path="interface" element={<Interface />} />
        </Routes>
       
      </Router>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
