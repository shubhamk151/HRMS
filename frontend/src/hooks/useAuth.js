import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../features/auth/authSlice";
import authApi from "../api/authApi";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { token, user, role, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const login = async (credentials) => {
    const res = await authApi.login(credentials);

    dispatch(
      loginSuccess({
        token: res.data.token,
        role: res.data.user.role,
        user: res.data.user,
      })
    );

    return res;
  };

  const logoutUser = () => dispatch(logout());

  return { token, user, role, isAuthenticated, login, logoutUser };
};
