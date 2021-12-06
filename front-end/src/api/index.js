import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = () => API.get("/post");
export const createPost = (postValues) => API.post("/post", postValues);
export const deletePost = (id) => API.delete(`/post/${id}`);
export const fetchPost = (id) => API.get(`/post/${id}`);
export const updatePost = (id, values) => API.patch(`/post/${id}`, values);
export const searchPosts = (formValues) =>
  API.get(`/post/search?title=${formValues.title}&tags=${formValues.tags}`);
export const signin = (formValues) => API.post("/user/signin", formValues);
export const signup = (formValues) => API.post("/user/signup", formValues);
