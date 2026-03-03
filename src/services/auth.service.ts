import { authKey } from "@/constants/storageKey";
import { getFromLocalStorage } from "@/utils/local-storage";

export const isUserLoggedIn = () => {
  return !!getFromLocalStorage(authKey);
};

