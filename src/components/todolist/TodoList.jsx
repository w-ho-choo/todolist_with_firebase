import React, { useEffect, useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux'

import './Todo.css'

const TodoList = (props) => {
  const myTodoList = useSelector(state => state.myTodoList);
  const [input, setInput] = useState('');
  
  const onSubmit = (todo, inputValue) => {
    props.editTodoEnd(todo, inputValue);
    setInput('');
  }

  return (
    <ListGroup id="todo-group">
      {
        myTodoList.length === 0
        ? <div id="empty-list">아직 할 일이 없어요!</div>
        : myTodoList.map((a, i) => {
          return (
            <ListGroup.Item key={a.id} className='todolist-wr'>
              <div
                className='todolist-inner'
              >
                {
                  a.edit 
                  ? <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
                    : <div style={{display: 'flex', alignItems: 'center'}}>
                      <input
                        type="checkbox"
                        checked={a.isFinished ? true : false}
                        disabled
                      />
                      <span onClick={() => props.todoFinished(a)} >{a.todoItemContent}</span>
                    </div>
                }
              </div>
              <div className='todo-btn-wr'>
                {
                  a.edit
                    ? <Button
                      className='edit-start-btn'
                      onClick={() => onSubmit(a, input)}
                    >수정하기</Button>
                    : <div>
                      <Button
                        className='edit-start-btn'
                        onClick={() => props.editTodoFirst(a)}
                      >수정</Button>
                      <Button
                        className='delete-btn'
                        onClick={() => props.removeTodo(a)}
                      >삭제</Button>
                    </div>
                }
              </div>
            </ListGroup.Item>
          )
        })
      }
    </ListGroup>
  )
}

export default TodoList