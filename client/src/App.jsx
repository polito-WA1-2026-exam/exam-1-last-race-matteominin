import { useState } from 'react';
import { Routes, Route } from 'react-router';
import AuthProvider from './contexts/AuthProvider.jsx';

// COMPONENTS
import Layout from './components/Layout.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Leaderboard from './components/Leaderbord.jsx';
import Game from './components/game/Game.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import NotFound from './components/NotFound.jsx';

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="leaderboard" element={<Leaderboard/>} />
            <Route path="game" element={<Game />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
