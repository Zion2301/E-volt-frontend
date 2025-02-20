import './App.css';
// import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Main from './components/Main';
// import Services from './components/Services'; 
// import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
 import Userdashboard from './components/Userdashboard';
import Services from './components/Services';
import Dashboard from './components/Dashboard';

function App() {
  return (
    

    <>
      <Router>
       <Navbar />
       <Routes>
         <Route path="/" element={<Main/>} />
         <Route path='/dashboard' element={<Dashboard/>}></Route>
         <Route path='/service' element={<Services/>}></Route>
         <Route path='/login' element={<Login/>}></Route>
         <Route path='/register' element={<Signup/>}></Route>
         <Route path='/user' element={<Userdashboard/>}></Route>
       </Routes>
       {/* <Footer /> */}
     </Router>
    </>
  );
}

export default App;
