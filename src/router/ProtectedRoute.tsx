import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

export function ProtectedRoute() {
  const currentLocation = useLocation();
  const { accessToken, refreshToken, nickname, profileImageUrl } =
    useAuthStore();

  const isLogin =
    accessToken !== '' &&
    refreshToken !== '' &&
    nickname !== '' &&
    profileImageUrl !== '';

  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate
      to={'/myAccount'}
      replace
      state={{ redirectedFrom: currentLocation }}
    />
  );
}
