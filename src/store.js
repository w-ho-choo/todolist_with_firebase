import { configureStore, createSlice } from "@reduxjs/toolkit";

const loginStatus = createSlice({
  name: 'loginStatus',
  initialState: null,
  reducers: {
    changeStatus(state, action) {
      return state = action.payload
    }
  }
});

const userName = createSlice({
  name: 'userName',
  initialState: '',
  reducers: {
    changeName(state, action) {
      return state = action.payload;
    }
  }
});

const myTodoList = createSlice({
  name: 'myTodoList',
  initialState: [],
  reducers: {
    pushTodoList(state, action) {
      return state = action.payload;
    }
  }
})

export const { changeStatus } = loginStatus.actions;
export const { changeName } = userName.actions;
export const { pushTodoList } = myTodoList.actions;

export default configureStore({
  reducer: {
    loginStatus: loginStatus.reducer,
    userName: userName.reducer,
    myTodoList: myTodoList.reducer
  }
})