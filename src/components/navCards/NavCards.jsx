import React, { useState, useEffect } from 'react'
import './navCards.css'
import { Link, useLocation } from 'react-router-dom'
import KeyBoardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import KeyBoardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import {
    PersonOutlined,
    PeopleOutlined,
    SportsBasketballOutlined,
    HomeOutlined,
    AccountBoxOutlined,
    SettingsOutlined,
    AssessmentOutlined,
    TrendingUpOutlined,
    RemoveRedEyeOutlined,
} from '@material-ui/icons'

export default function NavCards() {
    const [playerLinks, setPlayerLinks] = useState(true)
    const [teamLinks, setTeamLinks] = useState(true)
    const [gameLinks, setGameLinks] = useState(true)

    return (
        <div className="navCards">
            <div className="navCardItem">
                <div className="navCardImg">
                    <img src="https://raw.githubusercontent.com/kaiyangzheng/NBAGopher-Web-App/main/static/player-card-image.jpg" alt="navCardImg" className="img" />
                </div>
                <Link to="/players" style={{ textDecoration: "none" }}>
                    <div className="navCardTitle">
                        Players Links
                    </div>
                </Link >
                {playerLinks &&
                    <ul className="linksList">
                        <Link to="/players" style={{ textDecoration: "none" }}>
                            <li className="linksListItem">
                                <PersonOutlined className="linksListIcon" />
                                Players
                            </li>
                        </Link>
                        <Link to="/trends" style={{ textDecoration: "none" }}>
                            <li className="linksListItem">
                                <TrendingUpOutlined className="linksListIcon" />
                                Trends
                            </li>
                        </Link>
                        <Link to="/playerpredictions" style={{ textDecoration: "none" }}>
                            <li className="linksListItem">
                                <RemoveRedEyeOutlined className="linksListIcon" />
                                Predictions
                            </li>
                        </Link>
                    </ul>
                }
                <div className="arrowContainer" onClick={() => { setPlayerLinks(!playerLinks) }}>
                    {playerLinks ? <KeyBoardArrowUp /> : <KeyBoardArrowDown />}
                </div>

            </div>
            <div className="navCardItem">
                <div className="navCardImg">
                    <img src="https://raw.githubusercontent.com/kaiyangzheng/NBAGopher-Web-App/main/static/team-card-image.jpg" alt="navCardImg" className="img" />
                </div>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <div className="navCardTitle">
                        Teams Links
                    </div>
                </Link>
                {teamLinks &&
                    <ul className="linksList">
                        <li className="linksListItem">
                            <PeopleOutlined className="sidebarIcon" />
                            Teams
                        </li>
                        <li className="linksListItem">
                            <AssessmentOutlined className="sidebarIcon" />
                            Analytics
                        </li>
                        <li className="linksListItem">
                            <TrendingUpOutlined className="sidebarIcon" />
                            Trends
                        </li>
                    </ul>
                }
                <div className="arrowContainer" onClick={() => { setTeamLinks(!teamLinks) }}>
                    {teamLinks ? <KeyBoardArrowUp /> : <KeyBoardArrowDown />}
                </div>
            </div>
            <div className="navCardItem">
                <div className="navCardImg">
                    <img src="https://raw.githubusercontent.com/kaiyangzheng/NBAGopher-Web-App/main/static/game-card-image.jpg" alt="navCardImg" className="img" />
                </div>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <div className="navCardTitle">
                        Games Links
                    </div>
                </Link>
                {gameLinks &&
                    <ul className="linksList">
                        <li className="linksListItem">
                            <SportsBasketballOutlined className="sidebarIcon" />
                            Games
                        </li>
                        <li className="linksListItem">
                            <AssessmentOutlined className="sidebarIcon" />
                            Analytics
                        </li>
                        <li className="linksListItem">
                            < RemoveRedEyeOutlined className="sidebarIcon" />
                            Predictions
                        </li>
                    </ul>
                }
                <div className="arrowContainer" onClick={() => { setGameLinks(!gameLinks) }}>
                    {gameLinks ? <KeyBoardArrowUp /> : <KeyBoardArrowDown />}
                </div>
            </div>

        </div >
    )
}
