import axios from "axios";
import { SignUpValues } from "../header/SignUp";
import { LogInValues } from "../header/LogIn";
import { getAxiosErrorObject } from "./error-functions";

export const register = async (user: SignUpValues) => {
  try {
    const res = await axios.post(`/api/register`, user);
    return res.data;
  } catch (err) {
    return getAxiosErrorObject(err);
  }
};

export const login = async (user: LogInValues) => {
  return await axios
    .post(`/api/login`, user, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return getAxiosErrorObject(err);
    });
};

export const isAuthenticated = async () => {
  try {
    const res = await axios.get<boolean>(`/api/authenticate`);
    return res.data;
  } catch (err) {
    return getAxiosErrorObject(err);
  }
};

export const signout = async () => {
  return await axios
    .get(`/api/signout`)
    .then((res) => {
      if (res.status === 200) return true;
      else return false;
    })
    .catch((err) => {
      return getAxiosErrorObject(err);
    });
};

export const fetchOrderHistory = async () => {
  try {
    const res = await axios.get("/api/order-history");
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return getAxiosErrorObject(err);
  }
};
