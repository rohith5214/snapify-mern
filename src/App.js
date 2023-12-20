import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Auth from './components/Auth';
import Profile from './components/Profile';
import { tokenAuthorizationContext } from './Context/TokenAuth';
import { useContext } from 'react';

function App() {
  const {Isauthorized,setIsAuthorized} = useContext(tokenAuthorizationContext)

  return (
    <>
       <Routes>
        <Route path='/' element={<Auth/>}/>
        <Route path='/register' element={<Auth register/>}/>
        <Route path='/dashboard' element={Isauthorized?<Profile/>:<Auth/>}/>
       </Routes>
    </>
  );
}

export default App;
