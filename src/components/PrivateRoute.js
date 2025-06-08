import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const token = useSelector(state => state.auth.token);
  console.log('PrivateRoute: token=', token);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;