import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Details from './components/Details';
import Creater from './components/Creater';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/country-details/:id' element={<Details />} />
        <Route path='/create-activity' element={<Creater />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
