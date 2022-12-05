import axios from "axios";
const PORT = "http://localhost:5000";

export const register = async (user) => {
  return await axios
    .post(`${PORT}/api/register`, user)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
};

export const login = async (user) => {
  return await axios
    .post(`${PORT}/api/login`, user, {
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
    .get(`${PORT}/api/signout`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const fetchOrderHistory = async () => {
  return await axios
    .get(`${PORT}/api/orderHistory`)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
};
