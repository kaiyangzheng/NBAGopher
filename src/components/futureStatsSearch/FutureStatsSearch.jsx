import React, { useEffect } from 'react'
import './futurestatssearch.css'
import TextField from '@material-ui/core/TextField';

export default function FutureStatsSearch() {
    const season = 2021;
    const [searchValue, setSearchValue] = React.useState('Stephen Curry');
    const [filteredPlayer, setFilteredPlayer] = React.useState([]);
    const [filteredPlayerPredictedStats, setFilteredPlayerPredictedStats] = React.useState({});

    const handleSearchPlayers = async () => {
        if (searchValue == '') {
            return;
        }
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch(`https://data.nba.net/data/10s/prod/v1/${season}/players.json`, requestOptions)
        const players = await response.json();
        let filter = players.league.standard.filter(player => (player.firstName.toLowerCase() + ' ' + player.lastName.toLowerCase()).includes(searchValue.toLowerCase()))
        setFilteredPlayer(filter[0]);
    }

    const getPlayerPredictedStats = async (playerId) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        const response = await fetch(`https://nbagopher-api.herokuapp.com/player/compiled/${playerId}`, requestOptions)
        const player = await response.json();
        setFilteredPlayerPredictedStats(player['predicted_future_perf']);
    }

    useEffect(() => {
        if (filteredPlayer) {
            getPlayerPredictedStats(filteredPlayer.personId);
        }
    }, [filteredPlayer])

    useEffect(() => {
        handleSearchPlayers();
    }, [])


    return (
        <>
            <div className="playerSearchWrapper">
                <div className="futureStatsSearchbar">
                    <TextField id="standard-basic" label="Search Future Performance Predictions..." variant="standard" style={{ width: "100%" }} autoComplete="off" value={searchValue} onChange={(e) => { setSearchValue(e.target.value); handleSearchPlayers() }} />
                </div>
                <div className="searchResults">
                    {filteredPlayer && searchValue.trim().length != 0 && < ul className="searchList">
                        <li className="futureStatsSearchListItem  fadeInDown">
                            <div className="title">
                                <img src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${filteredPlayer?.personId}.png`} alt="" className="titleImg" />
                                <span className="searchName">{filteredPlayer?.firstName + ' ' + filteredPlayer?.lastName}</span>
                            </div>
                            <table className="statsTable">
                                <tr className="statsTr">
                                    <th className="statsTh">MPG</th>
                                    <th className="statsTh">PPG</th>
                                    <th className="statsTh">APG</th>
                                    <th className="statsTh">RPG</th>
                                    <th className="statsTh">TS%</th>
                                    <th className="statsTh">BPM</th>
                                </tr>
                                <tr className="statsTr">
                                    <td className="statsTd">{filteredPlayerPredictedStats?.mpg}</td>
                                    <td className="statsTd">{filteredPlayerPredictedStats?.ppg}</td>
                                    <td className="statsTd">{filteredPlayerPredictedStats?.apg}</td>
                                    <td className="statsTd">{filteredPlayerPredictedStats?.rpg}</td>
                                    <td className="statsTd">{filteredPlayerPredictedStats?.TS_pctg}</td>
                                    <td className="statsTd">{filteredPlayerPredictedStats?.BPM}</td>
                                </tr>
                            </table>
                        </li>
                        <div className="sub">
                            Predicted stats for the {season}-{season + 1} NBA season
                        </div>
                    </ul>}
                </div>
            </div >
        </>
    )
}
