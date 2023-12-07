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
import CreateGame from "./pages/game/CreateGame"

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

        <Route path="/game/create" element={<CreateGame />} />

      </Routes>

    </div>
  )
}

export default App
