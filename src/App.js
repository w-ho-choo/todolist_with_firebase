import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Header from './components/header/Header';

import './firebase.config';
import { app } from './firebase.config';

import { getAuth, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { addDoc, collection, deleteDoc, getDocs, getFirestore, orderBy, query, where, doc, setDoc } from 'firebase/firestore';

import { changeName, changeStatus, pushTodoList } from './store';

import TodoList from './components/todolist/TodoList';
import Todoform from './components/todolist/TodoForm';
import { useEffect } from 'react';

function App() {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const dispatch = useDispatch();

  const loginStatus = useSelector(state => state.loginStatus);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(changeStatus(user.uid));
      dispatch(changeName(user.displayName));
    } else {
      dispatch(changeStatus(null));
    }
  });

  useEffect(() => {
    getTodoList();
  }, [loginStatus]);

  const getTodoList = () => {
    const q = query(collection(db, "todoItem"), where("userId", "==", loginStatus), orderBy("createdTime", "desc"))
    getDocs(q).then((querySnapshot) => {
      const firestoreTodoItemList = [];
      querySnapshot.forEach((doc) => {
        firestoreTodoItemList.push({
          id: doc.id,
          todoItemContent: doc.data().todoItemContent,
          isFinished: doc.data().isFinished,
          createdTime: doc.data().createdTime ?? 0,
          userId: doc.data().userId,
          edit: doc.data().edit,
        })
      });
      dispatch(pushTodoList([...firestoreTodoItemList]));
    })
  }

  const onSubmit = async (newTodo) => {
    await addDoc(collection(db, "todoItem"), {
      todoItemContent: newTodo,
      isFinished: false,
      createdTime: Math.floor(Date.now() / 1000),
      userId: loginStatus,
      edit: false,
    })
    getTodoList();
  }

  const removeTodo = async (removeItem) => {
    const todoItemRef = doc(db, "todoItem", removeItem.id);
    await deleteDoc(todoItemRef);
    getTodoList();
  }

  const todoFinished = async (clickedItem) => {
    const todoItemRef = doc(db, "todoItem", clickedItem.id);
    await setDoc(todoItemRef, { isFinished: !clickedItem.isFinished }, { merge: true });
    getTodoList();
  }

  const editTodoFirst = async (editItem) => {
    const todoItemRef = doc(db, "todoItem", editItem.id);
    await setDoc(todoItemRef, { edit: !editItem.edit }, { merge: true })
    getTodoList();
  }

  const editTodoEnd = async (editItem, editSummary) => {
    const todoItemRef = doc(db, "todoItem", editItem.id);
    await setDoc(todoItemRef, { 
      todoItemContent: editSummary,
      edit: !editItem.edit
    }, { merge: true });
    getTodoList();
  }

  return (
    <div className="App">
      <Header auth={auth} provider={provider} />
      {
        loginStatus === null ? <div className='need-login'>로그인이 필요합니다</div>
          : <div>
            <TodoList
              removeTodo={removeTodo}
              todoFinished={todoFinished}
              editTodoFirst={editTodoFirst}
              editTodoEnd={editTodoEnd}
            />
            <Todoform
              onSubmit={onSubmit}
            />
          </div>
      }
    </div>
  );
}

export default App;
