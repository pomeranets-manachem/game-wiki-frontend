import './App.css'
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

import CategoryList from "./pages/category/CategoryList"
import CategoryCreate from "./pages/category/CategoryCreate"
import CategoryDetails from "./pages/category/CategoryDetails"
import CategoryEdit from "./pages/category/CategoryEdit"


function App() {
  return (
    <div className='App'>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/profile" element={<IsPrivate> <ProfilePage /> </IsPrivate>} />
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/games/" element={<GameList />} />
        <Route path="/games/create" element={<IsPrivate><GameCreate /></IsPrivate>} />
        <Route path="/games/details/:gameId" element={<GameDetails />} />
        <Route path="/games/edit/:gameId" element={<IsPrivate><GameEdit /></IsPrivate>} />

        <Route path="/categories/" element={<CategoryList />} />
        <Route path="/categories/create" element={<IsPrivate><CategoryCreate /></IsPrivate>} />
        <Route path="/categories/details/:categoryId" element={<CategoryDetails />} />
        <Route path="/categories/edit/:categoryId" element={<IsPrivate><CategoryEdit /></IsPrivate>} />

      </Routes>

    </div>
  )
}

export default App
