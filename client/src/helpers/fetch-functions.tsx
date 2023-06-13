import axios from "axios";
import { SignUpValues } from "../header/SignUp";
import { LogInValues } from "../header/LogIn";
import { getAxiosErrorObject } from "./error-functions";
import { PizzaPicked } from "../redux/pizza";
import { Address } from "../order/DeliveryAddress";

export interface OrderDetails {
  address: Address;
  date: Date;
  email: string;
  notes: string;
  order: PizzaPicked[];
  price: number;
}

interface AxiosMessage {
  message: string;
}

export const signup = async (user: SignUpValues) => {
  try {
    const res = await axios.post<AxiosMessage>(`/api/signup`, user);
    return res.data;
  } catch (err) {
    return getAxiosErrorObject(err);
  }
};

export const login = async (user: LogInValues) => {
  try {
    const res = await axios.post<AxiosMessage>(`/api/login`, user, {
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
    if (res.status === 200) return true;
    else return undefined;
  } catch (err) {
    return getAxiosErrorObject(err);
  }
};

export const checkLoggedIn = async () => {
  try {
    const res = await axios.get<boolean>(`/api/check-login`);
    return res.data;
  } catch (err) {
    return false;
  }
};

export const saveOrder = async (order: any) => {
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

export async function deleteOrders() {
  try {
    const res = await axios.get("/api/delete-orders");
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
