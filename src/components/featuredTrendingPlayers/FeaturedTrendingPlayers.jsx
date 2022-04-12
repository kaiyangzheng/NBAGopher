import React, { useState, useEffect } from 'react'
import PlayerTrendChart from '../../components/playerTrendChart/PlayerTrendChart'
import KeyBoardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import KeyBoardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import './featuredtrendingplayers.css'

export default function FeaturedTrendingPlayers() {
    const row1 = ['featured_offense_improve_id', 'featured_offense_decline_id'];
    const row2 = ['featured_defense_improve_id', 'featured_defense_decline_id'];
    const [trendingPlayers, setTrendingPlayers] = useState([])
    const [featuredTrendingData, setFeaturedTrendingData] = useState({});
    const [showTrendChart, setShowTrendChart] = useState({});


    const getTrendingFeaturedPlayers = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch("https://nbagopher-api.herokuapp.com/player/featured_trending_players", requestOptions)
        const trendingPlayers = await response.json()
        setTrendingPlayers(trendingPlayers);
    }

    const getTrendingFeaturedPlayersData = async (playerId) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch(`https://nbagopher-api.herokuapp.com/player/compiled/${playerId}`, requestOptions)
        const playerData = await response.json()
        setFeaturedTrendingData(featuredTrendingData => ({ ...featuredTrendingData, [playerId]: playerData }))
    }

    useEffect(() => {
        getTrendingFeaturedPlayers();
    }, [])


    useEffect(() => {
        for (const [key, value] of Object.entries(trendingPlayers)) {
            setShowTrendChart(showTrendChart => ({ ...showTrendChart, [value]: false }))
            getTrendingFeaturedPlayersData(value);
        }
    }, [trendingPlayers])
    return <>
        <div className="featuredTrending">
            {row1.map((row, index) => {
                const playerId = trendingPlayers[row];
                const playerData = featuredTrendingData[playerId];
                const ppgDiff = parseFloat(playerData?.player_basic_latest?.ppg) - parseFloat(playerData?.player_basic_prev?.ppg);
                const TSDiff = parseFloat(playerData?.player_advanced_latest?.TS_pctg) - parseFloat(playerData?.player_advanced_prev?.TS_pctg);
                const apgDiff = parseFloat(playerData?.player_basic_latest?.apg) - parseFloat(playerData?.player_basic_prev?.apg);
                const OBPMDiff = parseFloat(playerData?.player_advanced_latest?.OBPM) - parseFloat(playerData?.player_advanced_prev?.OBPM);
                return (
                    <div className="featuredTrendingItem" key={playerId} style={{ marginBottom: "20px" }}>
                        <div className="featuredTrendingTitleContainer">
                            <img src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`} alt="" className="featuredTrendingTitleImg" />
                            <span className="featuredTrendingTitleText">{playerData?.player_info?.first_name} {playerData?.player_info?.last_name}</span>
                        </div>
                        <div className="featuredTrendingStatsContainer">
                            <div className="featuredTrendingStat">{playerData?.player_basic_latest?.ppg} <span className="featuredTrendingStatName">PPG</span> <span className={ppgDiff >= 0 ? "statTrendNum increase" : "statTrendNum decrease"}>({ppgDiff >= 0 && "+"}{Math.round((ppgDiff) * 100) / 100})</span></div>
                            <div className="featuredTrendingStat">{playerData?.player_basic_latest?.apg} <span className="featuredTrendingStatName">APG</span> <span className={apgDiff >= 0 ? "statTrendNum increase" : "statTrendNum decrease"}>({apgDiff >= 0 && "+"}{Math.round((apgDiff) * 100) / 100})</span></div>
                            <div className="featuredTrendingStat">{playerData?.player_advanced_latest?.TS_pctg} <span className="featuredTrendingStatName">TS%</span> <span className={TSDiff >= 0 ? "statTrendNum increase" : "statTrendNum decrease"}>({TSDiff >= 0 && "+"}{Math.round((TSDiff) * 1000) / 1000})</span></div>
                            <div className="featuredTrendingStat">{playerData?.player_advanced_latest?.OBPM} <span className="featuredTrendingStatName">OBPM</span> <span className={OBPMDiff >= 0 ? "statTrendNum increase" : "statTrendNum decrease"}>({OBPMDiff >= 0 && "+"}{Math.round((OBPMDiff) * 1000) / 1000})</span></div>
                        </div>
                        <div className="featuredTrendingSub">
                            {index == 0 ? "Featured Offense Improvement" : "Featured Offense Decline"}
                        </div>
                        {!showTrendChart[playerId] && <div className="showMore">
                            <KeyBoardArrowDown onClick={() => { setShowTrendChart({ ...showTrendChart, [playerId]: true }) }} />
                        </div>}
                        {showTrendChart[playerId] &&
                            <>
                                <PlayerTrendChart playerId={playerId} role={"o"} />
                                <div className="showMore"><KeyBoardArrowUp onClick={() => { setShowTrendChart({ ...showTrendChart, [playerId]: false }) }} /></div>
                            </>
                        }

                    </div>
                )
            })}
        </div>
        <div className="featuredTrending">
            {row2.map((row, index) => {
                const playerId = trendingPlayers[row];
                const playerData = featuredTrendingData[playerId];
                const RPGDiff = parseFloat(playerData?.player_basic_latest?.rpg) - parseFloat(playerData?.player_basic_prev?.rpg);
                const SPGDiff = parseFloat(playerData?.player_basic_latest?.spg) - parseFloat(playerData?.player_basic_prev?.spg);
                const BPGDiff = parseFloat(playerData?.player_basic_latest?.bpg) - parseFloat(playerData?.player_basic_prev?.bpg);
                const DBPMDiff = parseFloat(playerData?.player_advanced_latest?.DBPM) - parseFloat(playerData?.player_advanced_prev?.DBPM);

                return (
                    <div className="featuredTrendingItem" key={playerId}>
                        <div className="featuredTrendingTitleContainer">
                            <img src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`} alt="" className="featuredTrendingTitleImg" />
                            <span className="featuredTrendingTitleText">{playerData?.player_info?.first_name} {playerData?.player_info?.last_name}</span>
                        </div>
                        <div className="featuredTrendingStatsContainer">
                            <div className="featuredTrendingStat">{playerData?.player_basic_latest?.rpg} <span className="featuredTrendingStatName">RPG</span> <span className={RPGDiff >= 0 ? "statTrendNum increase" : "statTrendNum decrease"}>({RPGDiff >= 0 && "+"}{Math.round((RPGDiff) * 100) / 100})</span></div>
                            <div className="featuredTrendingStat">{playerData?.player_basic_latest?.spg} <span className="featuredTrendingStatName">SPG</span> <span className={SPGDiff >= 0 ? "statTrendNum increase" : "statTrendNum decrease"}>({SPGDiff >= 0 && "+"}{Math.round((SPGDiff) * 1000) / 1000})</span></div>
                            <div className="featuredTrendingStat">{playerData?.player_basic_latest?.bpg} <span className="featuredTrendingStatName">BPG</span> <span className={BPGDiff >= 0 ? "statTrendNum increase" : "statTrendNum decrease"}>({BPGDiff >= 0 && "+"}{Math.round((BPGDiff) * 100) / 100})</span></div>
                            <div className="featuredTrendingStat">{playerData?.player_advanced_latest?.DBPM} <span className="featuredTrendingStatName">DBPM</span> <span className={DBPMDiff >= 0 ? "statTrendNum increase" : "statTrendNum decrease"}>({DBPMDiff >= 0 && "+"}{Math.round((DBPMDiff) * 100) / 100})</span></div>
                        </div>
                        <div className="featuredTrendingSub">
                            {index == 0 ? "Featured Defense Improvement" : "Featured Defense Decline"}
                        </div>
                        {!showTrendChart[playerId] && <div className="showMore">
                            <KeyBoardArrowDown onClick={() => { setShowTrendChart({ ...showTrendChart, [playerId]: true }) }} />
                        </div>}
                        {showTrendChart[playerId] &&
                            <>
                                <PlayerTrendChart playerId={playerId} role={"d"} />
                                <div className="showMore"><KeyBoardArrowUp onClick={() => { setShowTrendChart({ ...showTrendChart, [playerId]: false }) }} /></div>
                            </>
                        }
                    </div>
                )
            })}
        </div>
    </>
}
