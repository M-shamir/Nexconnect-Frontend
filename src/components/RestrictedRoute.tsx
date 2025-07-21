// src/components/RestrictedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface Props {
  children: JSX.Element;
}

export default function RestrictedRoute({ children }: Props) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
