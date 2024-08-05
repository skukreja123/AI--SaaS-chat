import './App.css'
import { Header } from './Component/Header'
import { Route, Routes } from "react-router-dom";
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { Signup } from './Pages/Signup';
import { Chat } from './Pages/Chat';
import { NotFound } from './Pages/NotFound';
import { useAuth } from './Context/AuthContext';

function App() {

  console.log(useAuth()?.isLoggedIn);

  return (
    <main>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </main>
  )
}

export default App
