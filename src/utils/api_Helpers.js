import axios from "axios";
//  const baesURL = "http://localhost:4000";
// const baesURL = process.env.REACT_APP_BASE_URL;
const baesURL = import.meta.env.VITE_API_URL;

// console.log(" ~ baesURL:", baesURL);

const axiosInstance = axios.create({
  baseURL: `${baesURL}/v1`,
});

export const authInstance = axios.create({
  baseURL: `${baesURL}/v1/auth`,
});

// Shared function to attach token
const attachTokenInterceptor = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

// Attach to both axios instances
attachTokenInterceptor(axiosInstance);
attachTokenInterceptor(authInstance);

// Attach token manually in helper functions
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// GET
export const get = (api, config = {}) =>
  axiosInstance.get(api, {
    ...config,
    headers: { ...getAuthHeaders(), ...config.headers },
  });

// POST
export const post = (api, body, config = {}) =>
  axiosInstance.post(api, body, {
    ...config,
    headers: { ...getAuthHeaders(), ...config.headers },
  });

// PATCH
export const patch = (url, body, config = {}) =>
  axiosInstance.patch(url, body, {
    ...config,
    headers: { ...getAuthHeaders(), ...config.headers },
  });

// PUT
export const put = (api, body, config = {}) =>
  axiosInstance.put(api, body, {
    ...config,
    headers: { ...getAuthHeaders(), ...config.headers },
  });

// DELETE
export const deleted = (api, body = {}, config = {}) =>
  axiosInstance.delete(api, {
    data: body,
    ...config,
    headers: { ...getAuthHeaders(), ...config.headers },
  });

export const del = deleted;

// POST Form
export const postForm = (url, body, config = {}) =>
  axiosInstance.post(url, body, {
    ...config,
    headers: {
      ...getAuthHeaders(),
      ...config.headers,
      "Content-Type": "multipart/form-data",
    },
  });

// PUT Form
export const putForm = (url, body, config = {}) =>
  axiosInstance.put(url, body, {
    ...config,
    headers: {
      ...getAuthHeaders(),
      ...config.headers,
      "Content-Type": "multipart/form-data",
    },
  });
