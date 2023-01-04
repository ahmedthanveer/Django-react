import React from "react";
import axiosInstance from "./user-service";
const API_URL = 'http://localhost:8000';
export const useDjangoService = () => {
  const postProxy = React.useCallback(
    (url, data, authInfo) => {
      return axiosInstance
        .post(`${API_URL}/${url}`, data, {
          headers: {
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          throw err.response ? err.response.data : err;
        });
    },
    [null]
  );

  const putProxy = React.useCallback(
    (url, data) => {
      return axiosInstance
        .put(`${API_URL}/${url}`, data, {
          headers: {
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          throw err.response ? err.response.data : err;
        });
    },
    [null]
  );

  const getProxy = React.useCallback(
    (url) => {
      return axiosInstance
        .get(`${API_URL}/${url}`, {
          headers: {
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          throw Promise.reject(err);
        });
    },
    [null]
  );

  const deleteProxy = React.useCallback(
    (url, data) => {
      return axiosInstance
        .delete(`${API_URL}/${url}`, {
          headers: {
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          throw err.response ? err.response.data : err;
        });
    },
    [null]
  );

  return { postProxy, getProxy, putProxy, deleteProxy };
};