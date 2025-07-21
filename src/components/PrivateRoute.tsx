// src/components/PrivateRoute.tsx
import { useAppSelector } from '../store/hooks';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
