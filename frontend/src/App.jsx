<<<<<<< HEAD
import { useState } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import AppRoutes from './routes/AppRoutes'

function App() {
 

  return (
    <>
      <AppRoutes/>
    </>
  
  )
}

export default App
=======
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
>>>>>>> 9e453f3 (feat(user): implement user module with dashboard and document management)
