import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';

export function ProtectedRoute() {
  const currentLocation = useLocation();
  const showToast = useToastStore(state => state.showToast);
  const isLogin = useAuthStore(state => state.isLogin);

  useEffect(() => {
    if (!isLogin) {
      showToast({ mode: 'warning', message: '로그인 후 이용해 주세요' });
    }
  });

  return isLogin ? (
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
