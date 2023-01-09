import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import axios from "axios";
import thunk from "redux-thunk";

const LOAD_USERS = "LOAD_USERS";
const ADD_USER = "ADD_USER";

const loadUsers = (users) => ({
  type: LOAD_USERS,
  payload: users,
});

const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/users");
      dispatch(loadUsers(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addUserThunk = (userObj) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/users", userObj);
      dispatch(addUser(data));
    } catch (error) {}
  };
};

const reducer = (state = {}, action) => {
  if (action.type === "LOAD_USERS") {
    return { ...state, users: action.payload };
  }
  if (action.type === "ADD_USER") {
    return { ...state, users: [...state.users, action.payload] };
  }
  return state;
};

export const store = createStore(
  reducer,
  applyMiddleware(thunk, createLogger())
);
