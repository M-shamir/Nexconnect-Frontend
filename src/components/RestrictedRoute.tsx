import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import type { ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

export default function RestrictedRoute({ children }: Props) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
