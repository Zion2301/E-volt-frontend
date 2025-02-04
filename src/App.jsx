import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
// import Main from './components/Main';
// import Services from './components/Services'; 
// import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Dashboard from './components/Dashboard';

function App() {
  return (
    

    <>
      <Router>
       <Navbar />
       <Routes>
         <Route path="/" element={<Dashboard/>} />
         {/* <Route path='/dashboard' element={<Dashboard/>}></Route> */}
       </Routes>
       {/* <Footer /> */}
     </Router>
    </>
  );
}

export default App;
