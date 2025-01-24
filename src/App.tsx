import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
// import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile/Profile';
// import { ProductDetails } from './pages/ProductDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16 px-4 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/profile' element={<Profile />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;