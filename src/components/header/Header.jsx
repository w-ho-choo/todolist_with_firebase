import React from 'react'

import './Header.css'

import { Container, Navbar, Button } from 'react-bootstrap';

import { signInWithRedirect, signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';

const Header = (props) => {
  const loginStatus = useSelector(state => state.loginStatus);
  const userName = useSelector(state => state.userName)

  const loginWithGoogleBtn = (
    <Button
      className='log-btn'
      variant="outline-dark"
      onClick={() => {
        signInWithRedirect(props.auth, props.provider);
      }}
    >구글로 로그인</Button>
  );

  const logoutBtn = (
    <Button
      className='log-btn'
      variant="outline-dark"
      onClick={() => {
        signOut(props.auth)
      }}
    >로그아웃</Button>
  );

  const displayName = (
    <span className='display-name'>{userName}님 오늘의 할일은 무엇인가요?</span>
  )

  return (
    <div id='header'>
      {
        loginStatus === null ? loginWithGoogleBtn : logoutBtn
      }
      <div className='name-wr'>
        { loginStatus === null ? null : displayName }
      </div>
    </div>
  )
}

export default Header