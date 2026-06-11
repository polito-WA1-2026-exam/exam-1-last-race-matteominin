import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { AuthProvider } from './contexts/AuthContext.jsx';

// COMPONENTS
import Layout from './components/Layout.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import NotFound from './components/NotFound.jsx';

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
