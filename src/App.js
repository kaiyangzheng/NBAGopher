import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import TopBar from './components/topbar/TopBar'
import SideBar from './components/sidebar/SideBar'
import PlayerList from './pages/playerlist/PlayerList'
import Trends from './pages/playerTrends/Trends'
import PlayerPredictions from './pages/playerPredictions/PlayerPredictions'
import Home from './pages/home/Home'
import TeamList from './pages/teamList/TeamList'

import './app.css';

function App() {
  return (
    <Router>
      <TopBar />
      <div className="container">
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/players" element={<PlayerList />} />
        </Routes>
        <Routes>
          <Route path="/trends" element={<Trends />} />
        </Routes>
        <Routes>
          <Route path="/playerpredictions" element={<PlayerPredictions />} />
        </Routes>
        <Routes>
          <Route path="/teams" element={<TeamList />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
