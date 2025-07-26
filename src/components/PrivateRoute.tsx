import { useAppSelector } from '../store/hooks';
import { Navigate } from 'react-router-dom';
import type { ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

const PrivateRoute = ({ children }: Props) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
