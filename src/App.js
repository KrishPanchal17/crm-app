import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<><Navbar /><Dashboard /></>} />
          <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
          <Route path="/product" element={<><Navbar /><ProductManagement /></>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;