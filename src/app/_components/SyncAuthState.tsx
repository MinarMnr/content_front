// Example in a React component

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../reducers/authSlice";
import getCookie from "../_services/getCookie";

const SyncAuthState = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie("auth-token");
    const email = getCookie("auth-email");

    if (token && email) {
      dispatch(setCredentials({ email, token }));
    }
  }, [dispatch]);

  return null;
};

export default SyncAuthState;
