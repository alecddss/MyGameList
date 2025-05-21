import './css/App.css'
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import GameInfo from './pages/GameInfo'
import SignUp from "./pages/SignUp"
import LogIn from "./pages/LogIn"
import NavBar from './components/Navbar'
import { GameProvider } from './contexts/GameContext'
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <GameProvider>
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/gameinfo" element={<GameInfo />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </main>
    </GameProvider>
  )
}

export default App
