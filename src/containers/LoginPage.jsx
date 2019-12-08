import React from 'react';
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  localStorage.setItem('imageUrl', undefined);
  return (
    <div>
      <Navbar />
      <p className="title">LOGIN ADMIN</p>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
