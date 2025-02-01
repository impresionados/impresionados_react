import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';
import { ProductDetail } from "./pages/Products/ProductDetail";
import { CartDisplay } from './pages/Cart/Cart';
import { Profile } from './pages/Profile/Profile';
import { LoginForm } from './pages/LoginForm/LoginForm';
import { RegisterForm } from './pages/RegisterForm/RegisterForm';
// import { ProductDetails } from './pages/ProductDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16 px-4 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path='/profile' element={<Profile />}/> */}
            <Route path='/product/:productId' element={<ProductDetail />}/>
            <Route path='/cart' element={<CartDisplay/>}/>
            <Route path='/profile' element={<LoginForm />}/>
            <Route path='/register' element={<RegisterForm />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;