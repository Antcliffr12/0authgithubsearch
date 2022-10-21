import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, Login } from './pages';

const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;

  
function App() {
  const [token, setToken] = useState( () => {
    return JSON.parse(localStorage.getItem("accessToken"))
  });

  useEffect( () => {
    localStorage.setItem("accessToken", JSON.stringify(token))
  }, [token])


  if ( ! token) {
    return <Login setToken={setToken} />
  }



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;
