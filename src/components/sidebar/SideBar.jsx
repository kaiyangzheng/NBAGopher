import React, { useState, useEffect } from 'react'
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
} from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom'
import './sidebar.css'

export default function SideBar() {
    const location = useLocation();
    const [active, setActive] = useState(location.pathname);
    useEffect(() => {
        setActive(location.pathname);
    }, [location]);
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <li className={active == "/" ? "sidebarListItem active" : "sidebarListItem"}>
                                <HomeOutlined className="sidebarIcon" />
                                Home
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <AccountBoxOutlined className="sidebarIcon" />
                            Account
                        </li>
                        <li className="sidebarListItem">
                            <SettingsOutlined className="sidebarIcon" />
                            Settings
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Players</h3>
                    <ul className="sidebarList">
                        <Link to="/players" style={{ textDecoration: 'none' }}>
                            <li className={active == "/players" ? "sidebarListItem active" : "sidebarListItem"}>
                                <PersonOutlined className="sidebarIcon" />
                                Players
                            </li>
                        </Link>
                        <Link to="/trends" style={{ textDecoration: 'none' }}>
                            <li className={active == "/trends" ? "sidebarListItem active" : "sidebarListItem"}>
                                <TrendingUpOutlined className="sidebarIcon" />
                                Trends
                            </li>
                        </Link>
                        <Link to="/playerpredictions" style={{ textDecoration: 'none' }}>
                            <li className={active == "/playerpredictions" ? "sidebarListItem active" : "sidebarListItem"}>
                                <RemoveRedEyeOutlined className="sidebarIcon" />
                                Predictions
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Teams</h3>
                    <ul className="sidebarList">
                        <Link to="/teams" style={{ textDecoration: 'none' }}>
                            <li className={active == "/teams" ? "sidebarListItem active" : "sidebarListItem"}>
                                <PeopleOutlined className="sidebarIcon" />
                                Teams
                            </li>
                        </Link>
                        <li className="sidebarListItem">
                            <AssessmentOutlined className="sidebarIcon" />
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUpOutlined className="sidebarIcon" />
                            Trends
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Games</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <SportsBasketballOutlined className="sidebarIcon" />
                            Games
                        </li>
                        <li className="sidebarListItem">
                            <AssessmentOutlined className="sidebarIcon" />
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            < RemoveRedEyeOutlined className="sidebarIcon" />
                            Predictions
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
