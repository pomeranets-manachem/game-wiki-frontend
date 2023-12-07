import './App.css'
import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import IsPrivate from "./components/IsPrivate/";
import IsAnon from "./components/IsAnon/";

import ProfilePage from "./pages/auth/UserProfilePage";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";

import Navbar from './components/Navbar';
import HomePage from "./pages/HomePage";
import GameCreate from "./pages/game/GameCreate";
import GameDetails from "./pages/game/GameDetails";
import GameEdit from "./pages/game/GameEdit"
import GameList from "./pages/game/GameList"

import Mockup from "./pages/Mockup"



function App() {
  return (
    <div className='App'>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* TODO: Delete Mockup when not used anymore */}
        <Route path="/mockup" element={<Mockup />} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />

        <Route path="/games/" element={<GameList />} />
        <Route path="/games/create" element={<GameCreate />} />
        <Route path="/games/details/:gameId" element={<GameDetails />} />
        <Route path="/games/edit/:gameId" element={<GameEdit />} />

      </Routes>

    </div>
  )
}

export default App
