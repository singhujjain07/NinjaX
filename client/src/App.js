import './App.css';
import { Route,Routes } from 'react-router-dom';
// Toastify : for pop-up notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login.js';
import HomePage from './pages/HomePage.js';
import Register from './pages/Auth/Register.js';
import Compiler from './pages/Compiler.js';
import FilesSection from './components/FilesSection.js';
import ProfilePage from './pages/ProfilePage.js';

function App() {
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/compiler' element={<Compiler/>}/>
        <Route path='/files' element={<FilesSection/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </>
  );
}

export default App;
