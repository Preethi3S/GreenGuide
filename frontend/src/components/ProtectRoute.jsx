import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ children, adminOnly = false }) => {
  const { token, user } = useSelector((state) => state.auth);

  console.log('ProtectRoute: token =', token);
  console.log('ProtectRoute: user =', user);
  console.log('ProtectRoute: adminOnly =', adminOnly);

  if (!token || !user) {
    console.log('Redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    console.log('Redirecting to / (not an admin)');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectRoute;
