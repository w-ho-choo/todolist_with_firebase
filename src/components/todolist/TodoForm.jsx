import React, { useState } from 'react'
import { Button } from 'react-bootstrap';

import './Todo.css'

const Todoform = (props) => {
  const [input, setInput] = useState('');

  const onSubmit = () => {
    props.onSubmit(input);
    setInput('');
  }
  return (
    <div id='todo-form-wr'>
      <input 
        type="text"
        id='todo-item-input'
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder='할 일 입력하기'
      />
      <Button variant='outline-dark' onClick={onSubmit}>작성</Button>
    </div>
  )
}

export default Todoform