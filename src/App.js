import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import TopBar from './components/topbar/TopBar'
import SideBar from './components/sidebar/SideBar'
import PlayerList from './pages/playerlist/PlayerList'

import './app.css';

function App() {
  return (
    <Router>
      <TopBar />
      <div className="container">
        <SideBar />
        <Routes>
          <Route path="/players" element={<PlayerList />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
