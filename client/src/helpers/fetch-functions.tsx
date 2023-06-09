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
export const signup = async (user: SignUpValues) => {
  try {
    const res = await axios.post(`/api/signup`, user);
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

export const isAuthenticated = async () => {
  try {
    const res = await axios.get<boolean>(`/api/authenticate`);
    return res.data;
  } catch (err) {
    return getAxiosErrorObject(err);
  }
};

export const saveOrder = async (order: any) => {
  try {
    const res = await axios.post("/api/order", order);
    console.log(res);
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
