import axios from "axios";
import { SignUpValues } from "../header/SignUp";
import { LoginValues } from "../header/Login";
import { getAxiosErrorObject } from "./error-functions";
import { PizzaPicked } from "../redux/pizza";
import { Address } from "../order/DeliveryAddress";

export interface OrderDetails {
  pizzas: PizzaPicked[];
  date: Date;
  price: number;
  address: Address;
  notes: string;
}

interface AxiosMessage {
  status: number;
  message: string;
}
interface LoginMessage extends AxiosMessage {
  username: string;
}

export const signup = async (user: SignUpValues) => {
  try {
    const res = await axios.post<AxiosMessage>(`/api/signup`, user);
    return res.data;
  } catch (err) {
    return getAxiosErrorObject(err);
  }
};

export const login = async (user: LoginValues) => {
  try {
    const res = await axios.post<LoginMessage>(`/api/login`, user, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return getAxiosErrorObject(err);
  }
};

export const signout = async () => {
  try {
    const res = await axios.get<AxiosMessage>("/api/signout");
    return res.data;
  } catch (err) {
    return getAxiosErrorObject(err);
  }
};

export const checkLoggedIn = async () => {
  try {
    const res = await axios.get<AxiosMessage>(`/api/check-login`);
    return res.data;
  } catch (err) {
    return false;
  }
};

export const saveOrder = async (order: OrderDetails) => {
  try {
    const res = await axios.post<AxiosMessage>("/api/order", order);
    return res.data;
  } catch (err) {
    return getAxiosErrorObject(err);
  }
};

export const fetchOrderHistory = async () => {
  try {
    const res = await axios.get<OrderDetails[]>("/api/order-history");
    return res.data;
  } catch (err) {
    return getAxiosErrorObject(err);
  }
};

export const changePassword = async (newPassword: string) => {
  try {
    const res = await axios.patch<AxiosMessage>("/api/change-password", {
      newPassword: newPassword,
    });
    return res.data;
  } catch (err) {
    return getAxiosErrorObject(err);
  }
};

export const deleteProfile = async () => {
  try {
    const res = await axios.delete<AxiosMessage>("/api/delete-profile");
    return res.data;
  } catch (err) {
    return getAxiosErrorObject(err);
  }
};
