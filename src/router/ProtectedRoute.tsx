import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';

export function ProtectedRoute() {
  const currentLocation = useLocation();
  const showToast = useToastStore(state => state.showToast);
  const authenticated = useAuthStore(state => state.authenticated);

  useEffect(() => {
    if (!authenticated) {
      showToast({ mode: 'warning', message: '로그인 후 이용해 주세요' });
    }
  });

  return authenticated ? (
    <Outlet />
  ) : (
    <>
      <Navigate
        to={'/myAccount'}
        replace
        state={{ redirectedFrom: currentLocation }}
      />
    </>
  );
}
