// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp"; 
import ForgotPassword from "./pages/ForgotPassword"; 
import NotFound from "./pages/NotFound"; 
import ProductsData from "./pages/ProductsData"; 
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import AddressSelectionPage from './pages/AddressSelectionPage';
import PaymentConfirmation from './pages/PaymentConfirmation';
import OrderTrackPage from './pages/OrderTrackPage';
import Home2 from './pages/Home2';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Public routes */}
        <Route path="/signin" element={<SignIn />} /> 
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="/products" element={<ProductsData />} />
        <Route path="/productitem/:id" element={<ProductDetails />} />
        {/* Protected routes */}
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><AddressSelectionPage /></ProtectedRoute>} />
        <Route path="/paymentconfirmation" element={<ProtectedRoute><PaymentConfirmation /></ProtectedRoute>} />
        <Route path="/ordertrack" element={<ProtectedRoute><OrderTrackPage /></ProtectedRoute>} />
        <Route path="/home2" element={<ProtectedRoute><Home2 /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
