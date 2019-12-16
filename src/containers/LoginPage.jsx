import React from 'react';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  localStorage.setItem('imageUrl', undefined);
  return (
    <div>
      <p className="title">LOGIN ADMIN</p>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
