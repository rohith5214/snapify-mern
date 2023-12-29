import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Auth from './components/Auth';
import Profile from './components/Profile';
import { tokenAuthorizationContext } from './Context/TokenAuth';
import { useContext } from 'react';
import Home from './components/Home';
import Allposts from './components/Allposts';
import AllUsers from './components/AllUsers';

function App() {
  const {Isauthorized,setIsAuthorized} = useContext(tokenAuthorizationContext)

  return (
    <>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/posts' element={<Allposts/>}/>
        <Route path='/users' element={<AllUsers/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth register/>}/>
        <Route path='/dashboard' element={Isauthorized?<Profile/>:<Auth/>}/>
       </Routes>
    </>
  );
}

export default App;
