// utils/logout.ts

import { clearCredentials } from "../reducers/authSlice";
import store from "../store.ts";

export const logout = () => {
  document.cookie =
    "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict";
  document.cookie =
    "auth-email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict";

  store.dispatch(clearCredentials());
};
