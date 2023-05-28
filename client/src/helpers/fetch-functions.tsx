import axios from "axios";
import { SignUpValues } from "../header/SignUp";
import { LogInValues } from "../header/LogIn";
import { getAxiosErrorObject } from "./error-functions";

export const register = async (user: SignUpValues) => {
  try {
    const res = await axios.post(`/api/register`, user);
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return getAxiosErrorObject(err);
  }
};

export const login = async (user: LogInValues) => {
  return await axios
    .post(`/api/login`, user, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
};

export const signout = async () => {
  return await axios
    .get(`/api/signout`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const fetchOrderHistory = async () => {
  return await axios
    .get(`/api/order-history`)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
};
