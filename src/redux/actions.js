import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.headers.common.Authorization = localStorage.getItem("token");

function apiService(method, endpoint, data) {
  return axios({
    url: endpoint,
    method: method,
    data: data,
    headers: {
      "Authorization": localStorage.getItem('token')
    }
  });
}

function setUser(user) {
  if (user && user.email) {
    localStorage.setItem("token", user.token);
    localStorage.setItem("user", JSON.stringify(user));
    return {
      type: "SET_USER",
      payload: user,
    };
  } else {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser && currentUser.email) {
      return {
        type: "SET_USER",
        payload: currentUser,
      };
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return {
        type: "SET_USER",
        payload: null
      }
    }
  }
}

function userLogin(payload) {
      return setUser(payload);
}
function userSignup(payload) {
        return setUser(payload);
}

function setPosts(posts) {
    return {
      type: "SET_POSTS",
      payload: posts,
    };
}
function addPost(post) {
    return {
      type: "ADD_POST",
      payload: post,
    };
}

function addComment(payload) {
    return setPosts(payload)
}
function updateComment(payload) {
  return setPosts(payload)
}
function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  return setUser(null)
}

export { addPost, addComment, updateComment, setPosts, userLogin, userSignup, apiService, setUser, logout };
